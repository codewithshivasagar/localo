import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min
} from 'class-validator';
import {
  DEFAULT_NOTIFICATION_LIST_LIMIT,
  DEFAULT_NOTIFICATION_LIST_PAGE,
  MAX_NOTIFICATION_LIST_LIMIT,
  NOTIFICATION_SORT_FIELDS,
  NOTIFICATION_SORT_ORDERS
} from '../notifications.constants';

export class NotificationFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @ApiPropertyOptional({
    description: 'Application notification type stored in notification data.type.'
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ enum: NOTIFICATION_SORT_FIELDS, default: 'createdAt' })
  @IsOptional()
  @IsIn(NOTIFICATION_SORT_FIELDS)
  sortBy?: (typeof NOTIFICATION_SORT_FIELDS)[number];

  @ApiPropertyOptional({ enum: NOTIFICATION_SORT_ORDERS, default: 'desc' })
  @IsOptional()
  @IsIn(NOTIFICATION_SORT_ORDERS)
  sortOrder?: (typeof NOTIFICATION_SORT_ORDERS)[number];

  @ApiPropertyOptional({ default: DEFAULT_NOTIFICATION_LIST_PAGE })
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = DEFAULT_NOTIFICATION_LIST_PAGE;

  @ApiPropertyOptional({ default: DEFAULT_NOTIFICATION_LIST_LIMIT })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(MAX_NOTIFICATION_LIST_LIMIT)
  limit: number = DEFAULT_NOTIFICATION_LIST_LIMIT;
}

