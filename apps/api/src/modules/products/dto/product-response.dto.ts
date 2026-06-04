import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductStatus, ProductType } from '@prisma/client';

export class ProductShopSummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;
}

export class ProductCategorySummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  isPrimary!: boolean;
}

export class ProductMediaResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  mediaId!: string;

  @ApiPropertyOptional()
  publicUrl?: string | null;

  @ApiPropertyOptional()
  altText?: string | null;

  @ApiProperty()
  sortOrder!: number;

  @ApiProperty()
  isPrimary!: boolean;
}

export class ProductResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  shopId!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  slug!: string;

  @ApiPropertyOptional()
  description?: string | null;

  @ApiPropertyOptional()
  shortDescription?: string | null;

  @ApiProperty({ enum: ProductType })
  productType!: ProductType;

  @ApiProperty({ enum: ProductStatus })
  status!: ProductStatus;

  @ApiPropertyOptional()
  sku?: string | null;

  @ApiProperty({ type: [String] })
  searchKeywords!: string[];

  @ApiProperty({ type: [String] })
  tags!: string[];

  @ApiPropertyOptional()
  basePrice?: string | null;

  @ApiPropertyOptional()
  compareAtPrice?: string | null;

  @ApiProperty()
  currencyCode!: string;

  @ApiProperty()
  taxRate!: string;

  @ApiProperty()
  isFeatured!: boolean;

  @ApiProperty()
  ratingAvg!: string;

  @ApiProperty()
  ratingCount!: number;

  @ApiPropertyOptional()
  publishedAt?: string | null;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;

  @ApiPropertyOptional({ type: ProductShopSummaryDto })
  shop?: ProductShopSummaryDto;

  @ApiProperty({ type: [ProductCategorySummaryDto] })
  categories!: ProductCategorySummaryDto[];

  @ApiProperty({ type: [ProductMediaResponseDto] })
  media!: ProductMediaResponseDto[];
}

export class ProductEnvelopeResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: ProductResponseDto })
  data!: ProductResponseDto;
}

export class ProductListResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: [ProductResponseDto] })
  data!: ProductResponseDto[];
}
