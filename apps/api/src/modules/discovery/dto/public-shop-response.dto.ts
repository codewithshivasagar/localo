import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PublicShopMediaResponseDto {
  @ApiProperty()
  id!: string;

  @ApiPropertyOptional()
  publicUrl?: string | null;

  @ApiPropertyOptional()
  altText?: string | null;
}

export class PublicShopCategoryResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  isPrimary!: boolean;
}

export class PublicShopLocationResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  label!: string;

  @ApiProperty()
  addressLine1!: string;

  @ApiPropertyOptional()
  addressLine2?: string | null;

  @ApiPropertyOptional()
  areaId?: string | null;

  @ApiPropertyOptional()
  areaName?: string | null;

  @ApiPropertyOptional()
  cityId?: string | null;

  @ApiPropertyOptional()
  cityName?: string | null;

  @ApiPropertyOptional()
  stateName?: string | null;

  @ApiPropertyOptional()
  countryName?: string | null;

  @ApiPropertyOptional()
  pincode?: string | null;

  @ApiProperty()
  latitude!: string;

  @ApiProperty()
  longitude!: string;

  @ApiProperty()
  isPrimary!: boolean;
}

export class PublicShopBusinessHourResponseDto {
  @ApiProperty()
  dayOfWeek!: number;

  @ApiPropertyOptional()
  opensAt?: string | null;

  @ApiPropertyOptional()
  closesAt?: string | null;

  @ApiProperty()
  isClosed!: boolean;
}

export class PublicShopResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;

  @ApiPropertyOptional()
  description?: string | null;

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

  @ApiProperty()
  isOpenNow!: boolean;

  @ApiPropertyOptional({ type: PublicShopMediaResponseDto })
  logoMedia?: PublicShopMediaResponseDto | null;

  @ApiPropertyOptional({ type: PublicShopMediaResponseDto })
  coverMedia?: PublicShopMediaResponseDto | null;

  @ApiProperty({ type: [PublicShopCategoryResponseDto] })
  categories!: PublicShopCategoryResponseDto[];

  @ApiProperty({ type: [PublicShopLocationResponseDto] })
  locations!: PublicShopLocationResponseDto[];

  @ApiProperty({ type: [PublicShopBusinessHourResponseDto] })
  businessHours!: PublicShopBusinessHourResponseDto[];

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}

export class PublicShopEnvelopeResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: PublicShopResponseDto })
  data!: PublicShopResponseDto;
}

export class PublicShopListResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: [PublicShopResponseDto] })
  data!: PublicShopResponseDto[];
}

