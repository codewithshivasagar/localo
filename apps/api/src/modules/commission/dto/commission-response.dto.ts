import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BillingCycle,
  CommissionSettingStatus,
  CommissionType,
  InvoiceStatus,
  ShopPaymentStatus
} from '@prisma/client';

export class CommissionShopSummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;
}

export class CommissionPlanResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty({ enum: CommissionType })
  commissionType!: CommissionType;

  @ApiProperty()
  commissionRate!: string;

  @ApiProperty()
  fixedAmount!: string;

  @ApiProperty({ enum: BillingCycle })
  billingCycle!: BillingCycle;

  @ApiProperty()
  gracePeriodDays!: number;

  @ApiProperty()
  isActive!: boolean;
}

export class CommissionSettingResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  shopId!: string;

  @ApiProperty({ type: CommissionShopSummaryDto })
  shop!: CommissionShopSummaryDto;

  @ApiProperty({ type: CommissionPlanResponseDto })
  commissionPlan!: CommissionPlanResponseDto;

  @ApiPropertyOptional()
  customCommissionRate?: string | null;

  @ApiPropertyOptional()
  customFixedAmount?: string | null;

  @ApiPropertyOptional({ enum: BillingCycle })
  billingCycle?: BillingCycle | null;

  @ApiProperty({ enum: CommissionSettingStatus })
  status!: CommissionSettingStatus;

  @ApiProperty()
  autoPauseOnOverdue!: boolean;

  @ApiPropertyOptional()
  nextInvoiceDate?: string | null;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}

export class CommissionLedgerItemResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  invoiceNumber!: string;

  @ApiProperty()
  shopId!: string;

  @ApiProperty({ type: CommissionShopSummaryDto })
  shop!: CommissionShopSummaryDto;

  @ApiProperty()
  billingPeriodStart!: string;

  @ApiProperty()
  billingPeriodEnd!: string;

  @ApiProperty()
  subtotalAmount!: string;

  @ApiProperty()
  taxAmount!: string;

  @ApiProperty()
  discountAmount!: string;

  @ApiProperty()
  totalAmount!: string;

  @ApiProperty()
  amountPaid!: string;

  @ApiProperty({ enum: InvoiceStatus })
  status!: InvoiceStatus;

  @ApiProperty()
  dueDate!: string;

  @ApiPropertyOptional()
  issuedAt?: string | null;

  @ApiPropertyOptional()
  paidAt?: string | null;

  @ApiProperty()
  createdAt!: string;
}

export class CommissionPaymentResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  amount!: string;

  @ApiProperty()
  paymentMethod!: string;

  @ApiPropertyOptional()
  referenceNumber?: string | null;

  @ApiProperty({ enum: ShopPaymentStatus })
  status!: ShopPaymentStatus;

  @ApiPropertyOptional()
  receivedAt?: string | null;

  @ApiProperty()
  createdAt!: string;
}

export class CommissionSummaryResponseDto {
  @ApiProperty({ type: CommissionShopSummaryDto })
  shop!: CommissionShopSummaryDto;

  @ApiPropertyOptional({ type: CommissionSettingResponseDto })
  setting?: CommissionSettingResponseDto | null;

  @ApiProperty()
  totalInvoiced!: string;

  @ApiProperty()
  totalPaid!: string;

  @ApiProperty()
  totalOutstanding!: string;

  @ApiProperty()
  overdueInvoiceCount!: number;

  @ApiProperty({ type: [CommissionPaymentResponseDto] })
  recentPayments!: CommissionPaymentResponseDto[];
}

export class CommissionSettingEnvelopeResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: CommissionSettingResponseDto })
  data!: CommissionSettingResponseDto;
}

export class CommissionSettingListResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: [CommissionSettingResponseDto] })
  data!: CommissionSettingResponseDto[];
}

export class CommissionLedgerListResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: [CommissionLedgerItemResponseDto] })
  data!: CommissionLedgerItemResponseDto[];
}

export class CommissionSummaryEnvelopeResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: CommissionSummaryResponseDto })
  data!: CommissionSummaryResponseDto;
}

