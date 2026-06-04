import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BillingCycle,
  CommissionSettingStatus,
  CommissionType,
  InvoiceStatus,
  ShopPaymentStatus
} from '@prisma/client';

export class CommissionShopSummaryDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  slug!: string;
}

export class CommissionPlanResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  code!: string;

  @ApiProperty({ enum: CommissionType })
  commissionType!: CommissionType;

  @ApiProperty({ type: String })
  commissionRate!: string;

  @ApiProperty({ type: String })
  fixedAmount!: string;

  @ApiProperty({ enum: BillingCycle })
  billingCycle!: BillingCycle;

  @ApiProperty({ type: Number })
  gracePeriodDays!: number;

  @ApiProperty({ type: Boolean })
  isActive!: boolean;
}

export class CommissionSettingResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  shopId!: string;

  @ApiProperty({ type: () => CommissionShopSummaryDto })
  shop!: CommissionShopSummaryDto;

  @ApiProperty({ type: () => CommissionPlanResponseDto })
  commissionPlan!: CommissionPlanResponseDto;

  @ApiPropertyOptional({ type: String, nullable: true })
  customCommissionRate?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  customFixedAmount?: string | null;

  @ApiPropertyOptional({ enum: BillingCycle })
  billingCycle?: BillingCycle | null;

  @ApiProperty({ enum: CommissionSettingStatus })
  status!: CommissionSettingStatus;

  @ApiProperty({ type: Boolean })
  autoPauseOnOverdue!: boolean;

  @ApiPropertyOptional({ type: String, nullable: true })
  nextInvoiceDate?: string | null;

  @ApiProperty({ type: String })
  createdAt!: string;

  @ApiProperty({ type: String })
  updatedAt!: string;
}

export class CommissionLedgerItemResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  invoiceNumber!: string;

  @ApiProperty({ type: String })
  shopId!: string;

  @ApiProperty({ type: () => CommissionShopSummaryDto })
  shop!: CommissionShopSummaryDto;

  @ApiProperty({ type: String })
  billingPeriodStart!: string;

  @ApiProperty({ type: String })
  billingPeriodEnd!: string;

  @ApiProperty({ type: String })
  subtotalAmount!: string;

  @ApiProperty({ type: String })
  taxAmount!: string;

  @ApiProperty({ type: String })
  discountAmount!: string;

  @ApiProperty({ type: String })
  totalAmount!: string;

  @ApiProperty({ type: String })
  amountPaid!: string;

  @ApiProperty({ enum: InvoiceStatus })
  status!: InvoiceStatus;

  @ApiProperty({ type: String })
  dueDate!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  issuedAt?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  paidAt?: string | null;

  @ApiProperty({ type: String })
  createdAt!: string;
}

export class CommissionPaymentResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  amount!: string;

  @ApiProperty({ type: String })
  paymentMethod!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  referenceNumber?: string | null;

  @ApiProperty({ enum: ShopPaymentStatus })
  status!: ShopPaymentStatus;

  @ApiPropertyOptional({ type: String, nullable: true })
  receivedAt?: string | null;

  @ApiProperty({ type: String })
  createdAt!: string;
}

export class CommissionSummaryResponseDto {
  @ApiProperty({ type: () => CommissionShopSummaryDto })
  shop!: CommissionShopSummaryDto;

  @ApiPropertyOptional({ type: () => CommissionSettingResponseDto, nullable: true })
  setting?: CommissionSettingResponseDto | null;

  @ApiProperty({ type: String })
  totalInvoiced!: string;

  @ApiProperty({ type: String })
  totalPaid!: string;

  @ApiProperty({ type: String })
  totalOutstanding!: string;

  @ApiProperty({ type: Number })
  overdueInvoiceCount!: number;

  @ApiProperty({ type: () => [CommissionPaymentResponseDto] })
  recentPayments!: CommissionPaymentResponseDto[];
}

export class CommissionSettingEnvelopeResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({ type: () => CommissionSettingResponseDto })
  data!: CommissionSettingResponseDto;
}

export class CommissionSettingListResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({ type: () => [CommissionSettingResponseDto] })
  data!: CommissionSettingResponseDto[];
}

export class CommissionLedgerListResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({ type: () => [CommissionLedgerItemResponseDto] })
  data!: CommissionLedgerItemResponseDto[];
}

export class CommissionSummaryEnvelopeResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({ type: () => CommissionSummaryResponseDto })
  data!: CommissionSummaryResponseDto;
}
