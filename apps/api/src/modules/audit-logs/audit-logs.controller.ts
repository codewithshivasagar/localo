import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@localo/shared-types';
import { Roles } from '../../common/decorators/roles.decorator';
import type { ApiResponse } from '../../common/responses/api-response.type';
import type { PaginationResponse } from '../../common/responses/pagination-response.type';
import { AuditLogsService } from './audit-logs.service';
import { AuditLogFilterDto } from './dto/audit-log-filter.dto';
import {
  AuditLogEnvelopeResponseDto,
  AuditLogListResponseDto,
  AuditLogResponseDto
} from './dto/audit-log-response.dto';

@ApiTags('Admin Audit Logs')
@ApiBearerAuth()
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('admin/audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get()
  @ApiOperation({ summary: 'List audit logs as an admin' })
  @ApiOkResponse({ type: AuditLogListResponseDto })
  list(
    @Query() filters: AuditLogFilterDto
  ): Promise<PaginationResponse<AuditLogResponseDto>> {
    return this.auditLogsService.list(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get audit log detail as an admin' })
  @ApiOkResponse({ type: AuditLogEnvelopeResponseDto })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<AuditLogResponseDto>> {
    const auditLog = await this.auditLogsService.findOne(id);

    return {
      success: true,
      message: 'Audit log fetched successfully',
      data: auditLog
    };
  }
}

