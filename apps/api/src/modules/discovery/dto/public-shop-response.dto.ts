import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PublicShopMediaResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  publicUrl?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  altText?: string | null;
}

export class PublicShopCategoryResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  slug!: string;

  @ApiProperty({ type: Boolean })
  isPrimary!: boolean;
}

export class PublicShopLocationResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  label!: string;

  @ApiProperty({ type: String })
  addressLine1!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  addressLine2?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  areaId?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  areaName?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  cityId?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  cityName?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  stateName?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  countryName?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  pincode?: string | null;

  @ApiProperty({ type: String })
  latitude!: string;

  @ApiProperty({ type: String })
  longitude!: string;

  @ApiProperty({ type: Boolean })
  isPrimary!: boolean;
}

export class PublicShopBusinessHourResponseDto {
  @ApiProperty({ type: Number })
  dayOfWeek!: number;

  @ApiPropertyOptional({ type: String, nullable: true })
  opensAt?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  closesAt?: string | null;

  @ApiProperty({ type: Boolean })
  isClosed!: boolean;
}

export class PublicShopResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  slug!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  description?: string | null;

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

  @ApiProperty({ type: Boolean })
  isOpenNow!: boolean;

  @ApiPropertyOptional({ type: () => PublicShopMediaResponseDto, nullable: true })
  logoMedia?: PublicShopMediaResponseDto | null;

  @ApiPropertyOptional({ type: () => PublicShopMediaResponseDto, nullable: true })
  coverMedia?: PublicShopMediaResponseDto | null;

  @ApiProperty({ type: () => [PublicShopCategoryResponseDto] })
  categories!: PublicShopCategoryResponseDto[];

  @ApiProperty({ type: () => [PublicShopLocationResponseDto] })
  locations!: PublicShopLocationResponseDto[];

  @ApiProperty({ type: () => [PublicShopBusinessHourResponseDto] })
  businessHours!: PublicShopBusinessHourResponseDto[];

  @ApiProperty({ type: String })
  createdAt!: string;

  @ApiProperty({ type: String })
  updatedAt!: string;
}

export class PublicShopEnvelopeResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({ type: () => PublicShopResponseDto })
  data!: PublicShopResponseDto;
}

export class PublicShopListResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({ type: () => [PublicShopResponseDto] })
  data!: PublicShopResponseDto[];
}
