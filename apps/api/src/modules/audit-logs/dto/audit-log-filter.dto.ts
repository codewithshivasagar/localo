import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min
} from 'class-validator';
import {
  AUDIT_LOG_SORT_FIELDS,
  AUDIT_LOG_SORT_ORDERS,
  DEFAULT_AUDIT_LOG_LIST_LIMIT,
  DEFAULT_AUDIT_LOG_LIST_PAGE,
  MAX_AUDIT_LOG_LIST_LIMIT
} from '../audit-logs.constants';

export class AuditLogFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  actorUserId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entityType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  entityId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  action?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  dateTo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: AUDIT_LOG_SORT_FIELDS, default: 'createdAt' })
  @IsOptional()
  @IsIn(AUDIT_LOG_SORT_FIELDS)
  sortBy?: (typeof AUDIT_LOG_SORT_FIELDS)[number];

  @ApiPropertyOptional({ enum: AUDIT_LOG_SORT_ORDERS, default: 'desc' })
  @IsOptional()
  @IsIn(AUDIT_LOG_SORT_ORDERS)
  sortOrder?: (typeof AUDIT_LOG_SORT_ORDERS)[number];

  @ApiPropertyOptional({ default: DEFAULT_AUDIT_LOG_LIST_PAGE })
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = DEFAULT_AUDIT_LOG_LIST_PAGE;

  @ApiPropertyOptional({ default: DEFAULT_AUDIT_LOG_LIST_LIMIT })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(MAX_AUDIT_LOG_LIST_LIMIT)
  limit: number = DEFAULT_AUDIT_LOG_LIST_LIMIT;
}

