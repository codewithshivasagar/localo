import { ApiPropertyOptional } from '@nestjs/swagger';
import { ShopStatus } from '@prisma/client';
import {
  IsBoolean,
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
  DEFAULT_SHOP_DISCOVERY_LIMIT,
  DEFAULT_SHOP_DISCOVERY_PAGE,
  DISCOVERY_SORT_ORDERS,
  MAX_SHOP_DISCOVERY_LIMIT,
  SHOP_DISCOVERY_SORT_FIELDS
} from '../discovery.constants';

export class ShopDiscoveryFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  cityId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  areaId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  openNow?: boolean;

  @ApiPropertyOptional({ enum: ShopStatus })
  @IsOptional()
  @IsEnum(ShopStatus)
  status?: ShopStatus;

  @ApiPropertyOptional({ enum: SHOP_DISCOVERY_SORT_FIELDS, default: 'featured' })
  @IsOptional()
  @IsIn(SHOP_DISCOVERY_SORT_FIELDS)
  sortBy?: (typeof SHOP_DISCOVERY_SORT_FIELDS)[number];

  @ApiPropertyOptional({ enum: DISCOVERY_SORT_ORDERS, default: 'desc' })
  @IsOptional()
  @IsIn(DISCOVERY_SORT_ORDERS)
  sortOrder?: (typeof DISCOVERY_SORT_ORDERS)[number];

  @ApiPropertyOptional({ default: DEFAULT_SHOP_DISCOVERY_PAGE })
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = DEFAULT_SHOP_DISCOVERY_PAGE;

  @ApiPropertyOptional({ default: DEFAULT_SHOP_DISCOVERY_LIMIT })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(MAX_SHOP_DISCOVERY_LIMIT)
  limit: number = DEFAULT_SHOP_DISCOVERY_LIMIT;
}

