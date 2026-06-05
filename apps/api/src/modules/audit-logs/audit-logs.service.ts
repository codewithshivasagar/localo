import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { normalizePagination } from '../../common/pagination/pagination';
import type { PaginationResponse } from '../../common/responses/pagination-response.type';
import { AuditLogsRepository, type AuditLogWithRelations } from './audit-logs.repository';
import { AuditLogFilterDto } from './dto/audit-log-filter.dto';
import { AuditLogResponseDto } from './dto/audit-log-response.dto';

@Injectable()
export class AuditLogsService {
  constructor(private readonly auditLogsRepository: AuditLogsRepository) {}

  async list(
    filters: AuditLogFilterDto
  ): Promise<PaginationResponse<AuditLogResponseDto>> {
    this.validateDateRange(filters);

    const { page, limit, skip } = normalizePagination(filters.page, filters.limit, {
      defaultPage: 1,
      defaultLimit: 10,
      maxLimit: 100
    });
    const [total, auditLogs] = await this.auditLogsRepository.list(filters, skip, limit);

    return {
      success: true,
      message: 'Audit logs fetched successfully',
      data: auditLogs.map(toAuditLogResponse),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findOne(id: string): Promise<AuditLogResponseDto> {
    const auditLog = await this.auditLogsRepository.findById(id);

    if (!auditLog) {
      throw new NotFoundException('Audit log not found');
    }

    return toAuditLogResponse(auditLog);
  }

  async record(params: {
    actorUserId?: string | null;
    action: string;
    entityType: string;
    entityId?: string | null;
    oldValues?: unknown;
    newValues?: unknown;
    ipAddress?: string | null;
    userAgent?: string | null;
  }) {
    return this.auditLogsRepository.create({
      actorUser: params.actorUserId
        ? { connect: { id: params.actorUserId } }
        : undefined,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId ?? undefined,
      oldValues:
        params.oldValues === undefined ? undefined : toJsonValue(scrub(params.oldValues)),
      newValues:
        params.newValues === undefined ? undefined : toJsonValue(scrub(params.newValues)),
      ipAddress: params.ipAddress ?? undefined,
      userAgent: params.userAgent ?? undefined
    });
  }

  async recordSafe(params: Parameters<AuditLogsService['record']>[0]) {
    try {
      await this.record(params);
    } catch {
      // Audit logging must never break the primary business workflow.
    }
  }

  private validateDateRange(filters: AuditLogFilterDto) {
    if (
      filters.dateFrom &&
      filters.dateTo &&
      new Date(filters.dateFrom) > new Date(filters.dateTo)
    ) {
      throw new BadRequestException('dateFrom cannot be after dateTo');
    }
  }
}

const toAuditLogResponse = (auditLog: AuditLogWithRelations): AuditLogResponseDto => ({
  id: auditLog.id,
  actorUserId: auditLog.actorUserId,
  actorUser: auditLog.actorUser
    ? {
        id: auditLog.actorUser.id,
        fullName: auditLog.actorUser.fullName,
        email: auditLog.actorUser.email
      }
    : null,
  action: auditLog.action,
  entityType: auditLog.entityType,
  entityId: auditLog.entityId,
  oldValues: scrub(auditLog.oldValues),
  newValues: scrub(auditLog.newValues),
  ipAddress: auditLog.ipAddress,
  userAgent: auditLog.userAgent,
  createdAt: auditLog.createdAt.toISOString()
});

const sensitiveKeyPattern = /(password|hash|token|secret|credential|authorization)/i;

const scrub = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(scrub);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, nestedValue]) => [
        key,
        sensitiveKeyPattern.test(key) ? '[REDACTED]' : scrub(nestedValue)
      ])
    );
  }

  return value;
};

const toJsonValue = (value: unknown): Prisma.InputJsonValue =>
  JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
