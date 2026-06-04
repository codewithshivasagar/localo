import { ApiPropertyOptional } from '@nestjs/swagger';
import { CommissionSettingStatus, InvoiceStatus } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsUUID,
  Max,
  Min
} from 'class-validator';
import {
  COMMISSION_LEDGER_SORT_FIELDS,
  COMMISSION_SORT_ORDERS,
  DEFAULT_COMMISSION_LIST_LIMIT,
  DEFAULT_COMMISSION_LIST_PAGE,
  MAX_COMMISSION_LIST_LIMIT
} from '../commission.constants';

export class CommissionLedgerFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  shopId?: string;

  @ApiPropertyOptional({ enum: InvoiceStatus })
  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  dateTo?: string;

  @ApiPropertyOptional({ enum: COMMISSION_LEDGER_SORT_FIELDS, default: 'createdAt' })
  @IsOptional()
  @IsIn(COMMISSION_LEDGER_SORT_FIELDS)
  sortBy?: (typeof COMMISSION_LEDGER_SORT_FIELDS)[number];

  @ApiPropertyOptional({ enum: COMMISSION_SORT_ORDERS, default: 'desc' })
  @IsOptional()
  @IsIn(COMMISSION_SORT_ORDERS)
  sortOrder?: (typeof COMMISSION_SORT_ORDERS)[number];

  @ApiPropertyOptional({ default: DEFAULT_COMMISSION_LIST_PAGE })
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = DEFAULT_COMMISSION_LIST_PAGE;

  @ApiPropertyOptional({ default: DEFAULT_COMMISSION_LIST_LIMIT })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(MAX_COMMISSION_LIST_LIMIT)
  limit: number = DEFAULT_COMMISSION_LIST_LIMIT;
}

export class CommissionSettingFilterDto {
  @ApiPropertyOptional({ enum: CommissionSettingStatus })
  @IsOptional()
  @IsEnum(CommissionSettingStatus)
  status?: CommissionSettingStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  shopId?: string;

  @ApiPropertyOptional({ default: DEFAULT_COMMISSION_LIST_PAGE })
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = DEFAULT_COMMISSION_LIST_PAGE;

  @ApiPropertyOptional({ default: DEFAULT_COMMISSION_LIST_LIMIT })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(MAX_COMMISSION_LIST_LIMIT)
  limit: number = DEFAULT_COMMISSION_LIST_LIMIT;
}

