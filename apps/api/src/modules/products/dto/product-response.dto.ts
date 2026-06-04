import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductStatus, ProductType } from '@prisma/client';

export class ProductShopSummaryDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  slug!: string;
}

export class ProductCategorySummaryDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  slug!: string;

  @ApiProperty({ type: Boolean })
  isPrimary!: boolean;
}

export class ProductMediaResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  mediaId!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  publicUrl?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  altText?: string | null;

  @ApiProperty({ type: Number })
  sortOrder!: number;

  @ApiProperty({ type: Boolean })
  isPrimary!: boolean;
}

export class ProductResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  shopId!: string;

  @ApiProperty({ type: String })
  title!: string;

  @ApiProperty({ type: String })
  slug!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  description?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  shortDescription?: string | null;

  @ApiProperty({ enum: ProductType })
  productType!: ProductType;

  @ApiProperty({ enum: ProductStatus })
  status!: ProductStatus;

  @ApiPropertyOptional({ type: String, nullable: true })
  sku?: string | null;

  @ApiProperty({ type: [String] })
  searchKeywords!: string[];

  @ApiProperty({ type: [String] })
  tags!: string[];

  @ApiPropertyOptional({ type: String, nullable: true })
  basePrice?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  compareAtPrice?: string | null;

  @ApiProperty({ type: String })
  currencyCode!: string;

  @ApiProperty({ type: String })
  taxRate!: string;

  @ApiProperty({ type: Boolean })
  isFeatured!: boolean;

  @ApiProperty({ type: String })
  ratingAvg!: string;

  @ApiProperty({ type: Number })
  ratingCount!: number;

  @ApiPropertyOptional({ type: String, nullable: true })
  publishedAt?: string | null;

  @ApiProperty({ type: String })
  createdAt!: string;

  @ApiProperty({ type: String })
  updatedAt!: string;

  @ApiPropertyOptional({ type: () => ProductShopSummaryDto })
  shop?: ProductShopSummaryDto;

  @ApiProperty({ type: () => [ProductCategorySummaryDto] })
  categories!: ProductCategorySummaryDto[];

  @ApiProperty({ type: () => [ProductMediaResponseDto] })
  media!: ProductMediaResponseDto[];
}

export class ProductEnvelopeResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({ type: () => ProductResponseDto })
  data!: ProductResponseDto;
}

export class ProductListResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({ type: () => [ProductResponseDto] })
  data!: ProductResponseDto[];
}
