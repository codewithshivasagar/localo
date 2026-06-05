import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SupportTicketPriority, SupportTicketStatus } from '@prisma/client';
import {
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min
} from 'class-validator';
import {
  DEFAULT_SUPPORT_TICKET_LIST_LIMIT,
  DEFAULT_SUPPORT_TICKET_LIST_PAGE,
  MAX_SUPPORT_TICKET_LIST_LIMIT,
  SUPPORT_TICKET_SORT_FIELDS,
  SUPPORT_TICKET_SORT_ORDERS
} from '../support-tickets.constants';

export class SupportTicketFilterDto {
  @ApiPropertyOptional({ enum: SupportTicketStatus })
  @IsOptional()
  @IsEnum(SupportTicketStatus)
  status?: SupportTicketStatus;

  @ApiPropertyOptional({ enum: SupportTicketPriority })
  @IsOptional()
  @IsEnum(SupportTicketPriority)
  priority?: SupportTicketPriority;

  @ApiPropertyOptional({ description: 'Support ticket category/type.' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  shopId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: SUPPORT_TICKET_SORT_FIELDS, default: 'createdAt' })
  @IsOptional()
  @IsIn(SUPPORT_TICKET_SORT_FIELDS)
  sortBy?: (typeof SUPPORT_TICKET_SORT_FIELDS)[number];

  @ApiPropertyOptional({ enum: SUPPORT_TICKET_SORT_ORDERS, default: 'desc' })
  @IsOptional()
  @IsIn(SUPPORT_TICKET_SORT_ORDERS)
  sortOrder?: (typeof SUPPORT_TICKET_SORT_ORDERS)[number];

  @ApiPropertyOptional({ default: DEFAULT_SUPPORT_TICKET_LIST_PAGE })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = DEFAULT_SUPPORT_TICKET_LIST_PAGE;

  @ApiPropertyOptional({ default: DEFAULT_SUPPORT_TICKET_LIST_LIMIT })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(MAX_SUPPORT_TICKET_LIST_LIMIT)
  limit: number = DEFAULT_SUPPORT_TICKET_LIST_LIMIT;
}
