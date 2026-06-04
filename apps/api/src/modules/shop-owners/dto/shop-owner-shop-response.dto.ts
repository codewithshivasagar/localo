import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ShopCommissionStatus,
  ShopStatus,
  ShopVerificationStatus
} from '@prisma/client';

export class ShopOwnerLocationResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  label!: string;

  @ApiProperty({ type: String })
  addressLine1!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  addressLine2?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  pincode?: string | null;

  @ApiProperty({ type: String })
  latitude!: string;

  @ApiProperty({ type: String })
  longitude!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  googlePlaceId?: string | null;

  @ApiProperty({ type: Boolean })
  isPrimary!: boolean;

  @ApiProperty({ type: Boolean })
  isServiceAreaEnabled!: boolean;

  @ApiPropertyOptional({ type: String, nullable: true })
  serviceRadiusKm?: string | null;
}

export class ShopOwnerBusinessHourResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: Number })
  dayOfWeek!: number;

  @ApiPropertyOptional({ type: String, nullable: true })
  opensAt?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  closesAt?: string | null;

  @ApiProperty({ type: Boolean })
  isClosed!: boolean;
}

export class ShopOwnerShopResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  slug!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  legalName?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  description?: string | null;

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

  @ApiProperty({ type: String })
  createdAt!: string;

  @ApiProperty({ type: String })
  updatedAt!: string;

  @ApiPropertyOptional({ type: () => ShopOwnerLocationResponseDto, nullable: true })
  location?: ShopOwnerLocationResponseDto | null;

  @ApiProperty({ type: () => [ShopOwnerBusinessHourResponseDto] })
  businessHours!: ShopOwnerBusinessHourResponseDto[];
}

export class ShopOwnerShopEnvelopeResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({ type: () => ShopOwnerShopResponseDto })
  data!: ShopOwnerShopResponseDto;
}
