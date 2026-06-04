import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import {
  CommissionLedgerFilterDto,
  CommissionSettingFilterDto
} from './dto/commission-ledger-filter.dto';

const commissionSettingInclude = {
  shop: {
    select: {
      id: true,
      name: true,
      slug: true
    }
  },
  commissionPlan: true
} satisfies Prisma.ShopCommissionSettingInclude;

const commissionInvoiceInclude = {
  shop: {
    select: {
      id: true,
      name: true,
      slug: true
    }
  }
} satisfies Prisma.ShopCommissionInvoiceInclude;

@Injectable()
export class CommissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  listSettings(filters: CommissionSettingFilterDto, skip: number, take: number) {
    const where: Prisma.ShopCommissionSettingWhereInput = {
      status: filters.status,
      shopId: filters.shopId
    };

    return this.prisma.$transaction([
      this.prisma.shopCommissionSetting.count({ where }),
      this.prisma.shopCommissionSetting.findMany({
        where,
        skip,
        take,
        include: commissionSettingInclude,
        orderBy: { updatedAt: 'desc' }
      })
    ]);
  }

  findSettingByShopId(shopId: string) {
    return this.prisma.shopCommissionSetting.findUnique({
      where: { shopId },
      include: commissionSettingInclude
    });
  }

  findCommissionPlan(planId: string) {
    return this.prisma.commissionPlan.findFirst({
      where: {
        id: planId,
        isActive: true
      },
      select: {
        id: true
      }
    });
  }

  findShop(shopId: string) {
    return this.prisma.shop.findFirst({
      where: {
        id: shopId,
        deletedAt: null
      },
      select: {
        id: true,
        ownerUserId: true,
        name: true,
        slug: true
      }
    });
  }

  findOwnedShop(ownerUserId: string) {
    return this.prisma.shop.findFirst({
      where: {
        ownerUserId,
        deletedAt: null
      },
      select: {
        id: true,
        name: true,
        slug: true
      }
    });
  }

  upsertSetting(params: {
    shopId: string;
    commissionPlanId: string;
    data: Prisma.ShopCommissionSettingUncheckedUpdateInput;
    createData: Prisma.ShopCommissionSettingUncheckedCreateInput;
  }) {
    return this.prisma.shopCommissionSetting.upsert({
      where: { shopId: params.shopId },
      update: params.data,
      create: params.createData,
      include: commissionSettingInclude
    });
  }

  listLedger(filters: CommissionLedgerFilterDto, skip: number, take: number) {
    const where = this.buildLedgerWhere(filters);

    return this.prisma.$transaction([
      this.prisma.shopCommissionInvoice.count({ where }),
      this.prisma.shopCommissionInvoice.findMany({
        where,
        skip,
        take,
        include: commissionInvoiceInclude,
        orderBy: this.buildLedgerOrderBy(filters)
      })
    ]);
  }

  listLedgerForShop(
    shopId: string,
    filters: CommissionLedgerFilterDto,
    skip: number,
    take: number
  ) {
    return this.listLedger({ ...filters, shopId }, skip, take);
  }

  getShopCommissionSummary(shopId: string) {
    return this.prisma.$transaction(async (tx) => {
      const [setting, invoices, recentPayments] = await Promise.all([
        tx.shopCommissionSetting.findUnique({
          where: { shopId },
          include: commissionSettingInclude
        }),
        tx.shopCommissionInvoice.findMany({
          where: { shopId },
          include: commissionInvoiceInclude,
          orderBy: { createdAt: 'desc' }
        }),
        tx.shopPayment.findMany({
          where: { shopId },
          take: 5,
          orderBy: { createdAt: 'desc' }
        })
      ]);

      return { setting, invoices, recentPayments };
    });
  }

  private buildLedgerWhere(
    filters: CommissionLedgerFilterDto
  ): Prisma.ShopCommissionInvoiceWhereInput {
    return {
      shopId: filters.shopId,
      status: filters.status,
      createdAt:
        filters.dateFrom || filters.dateTo
          ? {
              gte: filters.dateFrom ? new Date(filters.dateFrom) : undefined,
              lte: filters.dateTo ? new Date(filters.dateTo) : undefined
            }
          : undefined
    };
  }

  private buildLedgerOrderBy(
    filters: CommissionLedgerFilterDto
  ): Prisma.ShopCommissionInvoiceOrderByWithRelationInput {
    const sortOrder = filters.sortOrder ?? 'desc';

    switch (filters.sortBy) {
      case 'dueDate':
        return { dueDate: sortOrder };
      case 'totalAmount':
        return { totalAmount: sortOrder };
      case 'status':
        return { status: sortOrder };
      case 'createdAt':
      default:
        return { createdAt: sortOrder };
    }
  }
}

export type CommissionSettingWithRelations = NonNullable<
  Awaited<ReturnType<CommissionRepository['findSettingByShopId']>>
>;

export type CommissionLedgerItemWithRelations = NonNullable<
  Awaited<ReturnType<CommissionRepository['listLedger']>>[1][number]
>;

export type ShopCommissionSummaryData = Awaited<
  ReturnType<CommissionRepository['getShopCommissionSummary']>
>;

