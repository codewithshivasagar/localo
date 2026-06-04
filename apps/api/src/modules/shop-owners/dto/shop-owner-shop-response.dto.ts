import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ShopCommissionStatus,
  ShopStatus,
  ShopVerificationStatus
} from '@prisma/client';

export class ShopOwnerLocationResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  label!: string;

  @ApiProperty()
  addressLine1!: string;

  @ApiPropertyOptional()
  addressLine2?: string | null;

  @ApiPropertyOptional()
  pincode?: string | null;

  @ApiProperty()
  latitude!: string;

  @ApiProperty()
  longitude!: string;

  @ApiPropertyOptional()
  googlePlaceId?: string | null;

  @ApiProperty()
  isPrimary!: boolean;

  @ApiProperty()
  isServiceAreaEnabled!: boolean;

  @ApiPropertyOptional()
  serviceRadiusKm?: string | null;
}

export class ShopOwnerBusinessHourResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  dayOfWeek!: number;

  @ApiPropertyOptional()
  opensAt?: string | null;

  @ApiPropertyOptional()
  closesAt?: string | null;

  @ApiProperty()
  isClosed!: boolean;
}

export class ShopOwnerShopResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;

  @ApiPropertyOptional()
  legalName?: string | null;

  @ApiPropertyOptional()
  description?: string | null;

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
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;

  @ApiPropertyOptional({ type: ShopOwnerLocationResponseDto })
  location?: ShopOwnerLocationResponseDto | null;

  @ApiProperty({ type: [ShopOwnerBusinessHourResponseDto] })
  businessHours!: ShopOwnerBusinessHourResponseDto[];
}

export class ShopOwnerShopEnvelopeResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: ShopOwnerShopResponseDto })
  data!: ShopOwnerShopResponseDto;
}
