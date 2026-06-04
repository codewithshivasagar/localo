import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ShopCommissionStatus,
  ShopStatus,
  ShopVerificationStatus
} from '@prisma/client';

export class ShopOwnerSummaryDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  email!: string;

  @ApiProperty({ type: String })
  fullName!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  phone?: string | null;
}

export class ShopCategorySummaryDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  slug!: string;
}

export class ShopResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  ownerUserId!: string;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  slug!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  legalName?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  description?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  primaryCategoryId?: string | null;

  @ApiProperty({ enum: ShopStatus })
  status!: ShopStatus;

  @ApiProperty({ enum: ShopVerificationStatus })
  verificationStatus!: ShopVerificationStatus;

  @ApiProperty({ enum: ShopCommissionStatus })
  commissionStatus!: ShopCommissionStatus;

  @ApiPropertyOptional({ type: String, nullable: true })
  phone?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  email?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  websiteUrl?: string | null;

  @ApiProperty({ type: String })
  ratingAvg!: string;

  @ApiProperty({ type: Number })
  ratingCount!: number;

  @ApiProperty({ type: Boolean })
  isFeatured!: boolean;

  @ApiPropertyOptional({ type: String, nullable: true })
  approvedById?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  approvedAt?: string | null;

  @ApiProperty({ type: String })
  createdAt!: string;

  @ApiProperty({ type: String })
  updatedAt!: string;

  @ApiPropertyOptional({ type: () => ShopOwnerSummaryDto })
  owner?: ShopOwnerSummaryDto;

  @ApiPropertyOptional({ type: () => ShopCategorySummaryDto, nullable: true })
  primaryCategory?: ShopCategorySummaryDto | null;
}

export class ShopEnvelopeResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({ type: () => ShopResponseDto })
  data!: ShopResponseDto;
}

export class ShopListResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({ type: () => [ShopResponseDto] })
  data!: ShopResponseDto[];
}
