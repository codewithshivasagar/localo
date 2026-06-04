import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BillingCycle,
  CommissionSettingStatus
} from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
  Min
} from 'class-validator';

export class UpdateCommissionSettingDto {
  @ApiProperty()
  @IsUUID()
  shopId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  commissionPlanId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  customCommissionRate?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  customFixedAmount?: number;

  @ApiPropertyOptional({ enum: BillingCycle })
  @IsOptional()
  @IsEnum(BillingCycle)
  billingCycle?: BillingCycle;

  @ApiPropertyOptional({ enum: CommissionSettingStatus })
  @IsOptional()
  @IsEnum(CommissionSettingStatus)
  status?: CommissionSettingStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  autoPauseOnOverdue?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  nextInvoiceDate?: string;
}

