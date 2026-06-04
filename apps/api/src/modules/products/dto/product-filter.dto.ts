import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProductStatus } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min
} from 'class-validator';
import {
  DEFAULT_PRODUCT_LIST_LIMIT,
  DEFAULT_PRODUCT_LIST_PAGE,
  MAX_PRODUCT_LIST_LIMIT
} from '../products.constants';

export class ProductFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: ProductStatus })
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @ApiPropertyOptional({ enum: ProductStatus })
  @IsOptional()
  @IsEnum(ProductStatus)
  visibility?: ProductStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  shopId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasDiscount?: boolean;

  @ApiPropertyOptional({
    description: 'Comma-separated tags. Products matching any tag are returned.'
  })
  @IsOptional()
  @IsString()
  tags?: string;

  @ApiPropertyOptional({ default: DEFAULT_PRODUCT_LIST_PAGE })
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = DEFAULT_PRODUCT_LIST_PAGE;

  @ApiPropertyOptional({ default: DEFAULT_PRODUCT_LIST_LIMIT })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(MAX_PRODUCT_LIST_LIMIT)
  limit: number = DEFAULT_PRODUCT_LIST_LIMIT;
}
