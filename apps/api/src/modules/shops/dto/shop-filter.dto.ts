import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min
} from 'class-validator';
import {
  ShopCommissionStatus,
  ShopStatus,
  ShopVerificationStatus
} from '@prisma/client';
import {
  DEFAULT_SHOP_LIST_LIMIT,
  DEFAULT_SHOP_LIST_PAGE,
  MAX_SHOP_LIST_LIMIT
} from '../shops.constants';

export class ShopFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: ShopStatus })
  @IsOptional()
  @IsEnum(ShopStatus)
  status?: ShopStatus;

  @ApiPropertyOptional({ enum: ShopVerificationStatus })
  @IsOptional()
  @IsEnum(ShopVerificationStatus)
  verificationStatus?: ShopVerificationStatus;

  @ApiPropertyOptional({ enum: ShopCommissionStatus })
  @IsOptional()
  @IsEnum(ShopCommissionStatus)
  commissionStatus?: ShopCommissionStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  ownerUserId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  primaryCategoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ default: DEFAULT_SHOP_LIST_PAGE })
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = DEFAULT_SHOP_LIST_PAGE;

  @ApiPropertyOptional({ default: DEFAULT_SHOP_LIST_LIMIT })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(MAX_SHOP_LIST_LIMIT)
  limit: number = DEFAULT_SHOP_LIST_LIMIT;
}
