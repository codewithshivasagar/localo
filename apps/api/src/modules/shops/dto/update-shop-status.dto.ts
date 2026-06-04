import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ShopCommissionStatus,
  ShopStatus,
  ShopVerificationStatus
} from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateShopStatusDto {
  @ApiProperty({ enum: ShopStatus })
  @IsEnum(ShopStatus)
  status!: ShopStatus;

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
  @IsString()
  reason?: string;
}
