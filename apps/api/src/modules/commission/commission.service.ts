import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InvoiceStatus, Prisma } from '@prisma/client';
import { normalizePagination } from '../../common/pagination/pagination';
import type { PaginationResponse } from '../../common/responses/pagination-response.type';
import type { AuthenticatedUser } from '../../common/types/authenticated-user.type';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import {
  CommissionRepository,
  type CommissionLedgerItemWithRelations,
  type CommissionSettingWithRelations,
  type ShopCommissionSummaryData
} from './commission.repository';
import {
  CommissionLedgerFilterDto,
  CommissionSettingFilterDto
} from './dto/commission-ledger-filter.dto';
import {
  CommissionLedgerItemResponseDto,
  CommissionSettingResponseDto,
  CommissionSummaryResponseDto
} from './dto/commission-response.dto';
import { UpdateCommissionSettingDto } from './dto/update-commission-setting.dto';

@Injectable()
export class CommissionService {
  constructor(
    @Inject(CommissionRepository) private readonly commissionRepository: CommissionRepository,
    @Inject(AuditLogsService) private readonly auditLogsService: AuditLogsService
  ) {}

  async listSettings(
    filters: CommissionSettingFilterDto
  ): Promise<PaginationResponse<CommissionSettingResponseDto>> {
    const { page, limit, skip } = normalizePagination(filters.page, filters.limit, {
      defaultPage: 1,
      defaultLimit: 10,
      maxLimit: 100
    });
    const [total, settings] = await this.commissionRepository.listSettings(
      filters,
      skip,
      limit
    );

    return {
      success: true,
      message: 'Commission settings fetched successfully',
      data: settings.map(toCommissionSettingResponse),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async updateSetting(
    dto: UpdateCommissionSettingDto,
    actor?: AuthenticatedUser
  ): Promise<CommissionSettingResponseDto> {
    const shop = await this.commissionRepository.findShop(dto.shopId);

    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    const existingSetting = await this.commissionRepository.findSettingByShopId(
      dto.shopId
    );
    const commissionPlanId = dto.commissionPlanId ?? existingSetting?.commissionPlanId;

    if (!commissionPlanId) {
      throw new BadRequestException(
        'commissionPlanId is required when creating commission settings'
      );
    }

    const commissionPlan = await this.commissionRepository.findCommissionPlan(
      commissionPlanId
    );

    if (!commissionPlan) {
      throw new NotFoundException('Active commission plan not found');
    }

    const updateData = toSettingUpdateData(dto, commissionPlanId);
    const setting = await this.commissionRepository.upsertSetting({
      shopId: dto.shopId,
      commissionPlanId,
      data: updateData,
      createData: {
        shopId: dto.shopId,
        commissionPlanId,
        customCommissionRate:
          dto.customCommissionRate === undefined
            ? undefined
            : new Prisma.Decimal(dto.customCommissionRate),
        customFixedAmount:
          dto.customFixedAmount === undefined
            ? undefined
            : new Prisma.Decimal(dto.customFixedAmount),
        billingCycle: dto.billingCycle,
        status: dto.status,
        autoPauseOnOverdue: dto.autoPauseOnOverdue,
        nextInvoiceDate: dto.nextInvoiceDate ? new Date(dto.nextInvoiceDate) : undefined
      }
    });

    const response = toCommissionSettingResponse(setting);
    await this.auditLogsService.recordSafe({
      actorUserId: actor?.id,
      action: 'commission_settings.updated',
      entityType: 'shop_commission_settings',
      entityId: setting.id,
      oldValues: existingSetting ? toCommissionSettingResponse(existingSetting) : null,
      newValues: response
    });

    return response;
  }

  async listLedger(
    filters: CommissionLedgerFilterDto
  ): Promise<PaginationResponse<CommissionLedgerItemResponseDto>> {
    this.validateDateRange(filters);

    const { page, limit, skip } = normalizePagination(filters.page, filters.limit, {
      defaultPage: 1,
      defaultLimit: 10,
      maxLimit: 100
    });
    const [total, ledger] = await this.commissionRepository.listLedger(
      filters,
      skip,
      limit
    );

    return {
      success: true,
      message: 'Commission ledger fetched successfully',
      data: ledger.map(toCommissionLedgerItemResponse),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getOwnerSummary(user: AuthenticatedUser): Promise<CommissionSummaryResponseDto> {
    const shop = await this.getOwnedShopOrThrow(user.id);
    const summary = await this.commissionRepository.getShopCommissionSummary(shop.id);

    return toCommissionSummaryResponse(shop, summary);
  }

  async listOwnerLedger(
    user: AuthenticatedUser,
    filters: CommissionLedgerFilterDto
  ): Promise<PaginationResponse<CommissionLedgerItemResponseDto>> {
    this.validateDateRange(filters);

    const shop = await this.getOwnedShopOrThrow(user.id);
    const { page, limit, skip } = normalizePagination(filters.page, filters.limit, {
      defaultPage: 1,
      defaultLimit: 10,
      maxLimit: 100
    });
    const [total, ledger] = await this.commissionRepository.listLedgerForShop(
      shop.id,
      filters,
      skip,
      limit
    );

    return {
      success: true,
      message: 'Commission ledger fetched successfully',
      data: ledger.map(toCommissionLedgerItemResponse),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  private async getOwnedShopOrThrow(ownerUserId: string) {
    const shop = await this.commissionRepository.findOwnedShop(ownerUserId);

    if (!shop) {
      throw new NotFoundException('Owned shop not found');
    }

    return shop;
  }

  private validateDateRange(filters: CommissionLedgerFilterDto) {
    if (
      filters.dateFrom &&
      filters.dateTo &&
      new Date(filters.dateFrom) > new Date(filters.dateTo)
    ) {
      throw new BadRequestException('dateFrom cannot be after dateTo');
    }
  }
}

const toSettingUpdateData = (
  dto: UpdateCommissionSettingDto,
  commissionPlanId: string
): Prisma.ShopCommissionSettingUncheckedUpdateInput => ({
  commissionPlanId,
  customCommissionRate:
    dto.customCommissionRate === undefined
      ? undefined
      : new Prisma.Decimal(dto.customCommissionRate),
  customFixedAmount:
    dto.customFixedAmount === undefined
      ? undefined
      : new Prisma.Decimal(dto.customFixedAmount),
  billingCycle: dto.billingCycle,
  status: dto.status,
  autoPauseOnOverdue: dto.autoPauseOnOverdue,
  nextInvoiceDate: dto.nextInvoiceDate ? new Date(dto.nextInvoiceDate) : undefined
});

const toCommissionSettingResponse = (
  setting: CommissionSettingWithRelations
): CommissionSettingResponseDto => ({
  id: setting.id,
  shopId: setting.shopId,
  shop: {
    id: setting.shop.id,
    name: setting.shop.name,
    slug: setting.shop.slug
  },
  commissionPlan: {
    id: setting.commissionPlan.id,
    name: setting.commissionPlan.name,
    code: setting.commissionPlan.code,
    commissionType: setting.commissionPlan.commissionType,
    commissionRate: setting.commissionPlan.commissionRate.toString(),
    fixedAmount: setting.commissionPlan.fixedAmount.toString(),
    billingCycle: setting.commissionPlan.billingCycle,
    gracePeriodDays: setting.commissionPlan.gracePeriodDays,
    isActive: setting.commissionPlan.isActive
  },
  customCommissionRate: setting.customCommissionRate?.toString() ?? null,
  customFixedAmount: setting.customFixedAmount?.toString() ?? null,
  billingCycle: setting.billingCycle,
  status: setting.status,
  autoPauseOnOverdue: setting.autoPauseOnOverdue,
  nextInvoiceDate: setting.nextInvoiceDate?.toISOString().slice(0, 10) ?? null,
  createdAt: setting.createdAt.toISOString(),
  updatedAt: setting.updatedAt.toISOString()
});

const toCommissionLedgerItemResponse = (
  invoice: CommissionLedgerItemWithRelations
): CommissionLedgerItemResponseDto => ({
  id: invoice.id,
  invoiceNumber: invoice.invoiceNumber,
  shopId: invoice.shopId,
  shop: {
    id: invoice.shop.id,
    name: invoice.shop.name,
    slug: invoice.shop.slug
  },
  billingPeriodStart: invoice.billingPeriodStart.toISOString().slice(0, 10),
  billingPeriodEnd: invoice.billingPeriodEnd.toISOString().slice(0, 10),
  subtotalAmount: invoice.subtotalAmount.toString(),
  taxAmount: invoice.taxAmount.toString(),
  discountAmount: invoice.discountAmount.toString(),
  totalAmount: invoice.totalAmount.toString(),
  amountPaid: invoice.amountPaid.toString(),
  status: invoice.status,
  dueDate: invoice.dueDate.toISOString().slice(0, 10),
  issuedAt: invoice.issuedAt?.toISOString() ?? null,
  paidAt: invoice.paidAt?.toISOString() ?? null,
  createdAt: invoice.createdAt.toISOString()
});

const toCommissionSummaryResponse = (
  shop: { id: string; name: string; slug: string },
  summary: ShopCommissionSummaryData
): CommissionSummaryResponseDto => {
  const totalInvoiced = sumDecimals(
    summary.invoices.map((invoice) => invoice.totalAmount)
  );
  const totalPaid = sumDecimals(summary.invoices.map((invoice) => invoice.amountPaid));
  const outstanding = totalInvoiced.minus(totalPaid);

  return {
    shop,
    setting: summary.setting ? toCommissionSettingResponse(summary.setting) : null,
    totalInvoiced: totalInvoiced.toString(),
    totalPaid: totalPaid.toString(),
    totalOutstanding: outstanding.toString(),
    overdueInvoiceCount: summary.invoices.filter(
      (invoice) => invoice.status === InvoiceStatus.OVERDUE
    ).length,
    recentPayments: summary.recentPayments.map((payment) => ({
      id: payment.id,
      amount: payment.amount.toString(),
      paymentMethod: payment.paymentMethod,
      referenceNumber: payment.referenceNumber,
      status: payment.status,
      receivedAt: payment.receivedAt?.toISOString() ?? null,
      createdAt: payment.createdAt.toISOString()
    }))
  };
};

const sumDecimals = (values: Prisma.Decimal[]) =>
  values.reduce((total, value) => total.plus(value), new Prisma.Decimal(0));
