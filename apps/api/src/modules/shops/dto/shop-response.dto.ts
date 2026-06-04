import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ShopCommissionStatus,
  ShopStatus,
  ShopVerificationStatus
} from '@prisma/client';

export class ShopOwnerSummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  fullName!: string;

  @ApiPropertyOptional()
  phone?: string | null;
}

export class ShopCategorySummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;
}

export class ShopResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  ownerUserId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;

  @ApiPropertyOptional()
  legalName?: string | null;

  @ApiPropertyOptional()
  description?: string | null;

  @ApiPropertyOptional()
  primaryCategoryId?: string | null;

  @ApiProperty({ enum: ShopStatus })
  status!: ShopStatus;

  @ApiProperty({ enum: ShopVerificationStatus })
  verificationStatus!: ShopVerificationStatus;

  @ApiProperty({ enum: ShopCommissionStatus })
  commissionStatus!: ShopCommissionStatus;

  @ApiPropertyOptional()
  phone?: string | null;

  @ApiPropertyOptional()
  email?: string | null;

  @ApiPropertyOptional()
  websiteUrl?: string | null;

  @ApiProperty()
  ratingAvg!: string;

  @ApiProperty()
  ratingCount!: number;

  @ApiProperty()
  isFeatured!: boolean;

  @ApiPropertyOptional()
  approvedById?: string | null;

  @ApiPropertyOptional()
  approvedAt?: string | null;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;

  @ApiPropertyOptional({ type: ShopOwnerSummaryDto })
  owner?: ShopOwnerSummaryDto;

  @ApiPropertyOptional({ type: ShopCategorySummaryDto })
  primaryCategory?: ShopCategorySummaryDto | null;
}

export class ShopEnvelopeResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: ShopResponseDto })
  data!: ShopResponseDto;
}

export class ShopListResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: [ShopResponseDto] })
  data!: ShopResponseDto[];
}
