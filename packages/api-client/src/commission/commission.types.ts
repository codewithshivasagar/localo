import type { ApiRecord } from '../types/api-response';
import type { PaginationQuery } from '../types/pagination';

export interface CommissionShopSummary {
  id: string;
  name: string;
  slug: string;
}

export interface CommissionPlanResponse {
  id: string;
  name: string;
  code: string;
  commissionType: string;
  commissionRate: string;
  fixedAmount: string;
  billingCycle: string;
  gracePeriodDays: number;
  isActive: boolean;
}

export interface CommissionSettingResponse {
  id: string;
  shopId: string;
  shop: CommissionShopSummary;
  commissionPlan: CommissionPlanResponse;
  customCommissionRate?: string | null;
  customFixedAmount?: string | null;
  billingCycle?: string | null;
  status: string;
  autoPauseOnOverdue: boolean;
  nextInvoiceDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CommissionLedgerItemResponse {
  id: string;
  invoiceNumber: string;
  shopId: string;
  shop: CommissionShopSummary;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  subtotalAmount: string;
  taxAmount: string;
  discountAmount: string;
  totalAmount: string;
  amountPaid: string;
  status: string;
  dueDate: string;
  issuedAt?: string | null;
  paidAt?: string | null;
  createdAt: string;
}

export interface CommissionPaymentResponse {
  id: string;
  amount: string;
  paymentMethod: string;
  referenceNumber?: string | null;
  status: string;
  receivedAt?: string | null;
  createdAt: string;
}

export interface CommissionSummaryResponse {
  shop: CommissionShopSummary;
  setting?: CommissionSettingResponse | null;
  totalInvoiced: string;
  totalPaid: string;
  totalOutstanding: string;
  overdueInvoiceCount: number;
  recentPayments: CommissionPaymentResponse[];
}

export interface CommissionLedgerFilterQuery extends PaginationQuery {
  shopId?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export type UpdateCommissionSettingRequest = ApiRecord;
