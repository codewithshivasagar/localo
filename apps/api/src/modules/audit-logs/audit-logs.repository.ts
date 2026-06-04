import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import type { AuditLogFilterDto } from './dto/audit-log-filter.dto';

const auditLogInclude = {
  actorUser: {
    select: {
      id: true,
      fullName: true,
      email: true
    }
  }
} satisfies Prisma.AuditLogInclude;

@Injectable()
export class AuditLogsRepository {
  constructor(private readonly prisma: PrismaService) {}

  list(filters: AuditLogFilterDto, skip: number, take: number) {
    const where = this.buildWhere(filters);

    return this.prisma.$transaction([
      this.prisma.auditLog.count({ where }),
      this.prisma.auditLog.findMany({
        where,
        skip,
        take,
        include: auditLogInclude,
        orderBy: this.buildOrderBy(filters)
      })
    ]);
  }

  findById(id: string) {
    return this.prisma.auditLog.findUnique({
      where: { id },
      include: auditLogInclude
    });
  }

  create(data: Prisma.AuditLogCreateInput) {
    return this.prisma.auditLog.create({ data });
  }

  private buildWhere(filters: AuditLogFilterDto): Prisma.AuditLogWhereInput {
    const search = filters.search?.trim();

    return {
      actorUserId: filters.actorUserId,
      entityType: filters.entityType,
      entityId: filters.entityId,
      action: filters.action,
      createdAt:
        filters.dateFrom || filters.dateTo
          ? {
              gte: filters.dateFrom ? new Date(filters.dateFrom) : undefined,
              lte: filters.dateTo ? new Date(filters.dateTo) : undefined
            }
          : undefined,
      OR: search
        ? [
            { action: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { entityType: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { userAgent: { contains: search, mode: Prisma.QueryMode.insensitive } },
            {
              actorUser: {
                email: { contains: search, mode: Prisma.QueryMode.insensitive }
              }
            },
            {
              actorUser: {
                fullName: { contains: search, mode: Prisma.QueryMode.insensitive }
              }
            }
          ]
        : undefined
    };
  }

  private buildOrderBy(
    filters: AuditLogFilterDto
  ): Prisma.AuditLogOrderByWithRelationInput {
    const sortOrder = filters.sortOrder ?? 'desc';

    switch (filters.sortBy) {
      case 'action':
        return { action: sortOrder };
      case 'entityType':
        return { entityType: sortOrder };
      case 'createdAt':
      default:
        return { createdAt: sortOrder };
    }
  }
}

export type AuditLogWithRelations = NonNullable<
  Awaited<ReturnType<AuditLogsRepository['findById']>>
>;

