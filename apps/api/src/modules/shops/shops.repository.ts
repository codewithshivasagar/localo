import {
  Prisma,
  ShopCommissionStatus,
  ShopStatus,
  ShopTeamRole,
  ShopTeamStatus,
  ShopVerificationStatus,
  UserRole,
  UserStatus
} from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import type { ShopFilterDto } from './dto/shop-filter.dto';

const shopInclude = {
  ownerUser: {
    select: {
      id: true,
      email: true,
      fullName: true,
      phone: true
    }
  },
  primaryCategory: {
    select: {
      id: true,
      name: true,
      slug: true
    }
  }
} satisfies Prisma.ShopInclude;

@Injectable()
export class ShopsRepository {
  constructor(private readonly prisma: PrismaService) {}

  list(filters: ShopFilterDto, skip: number, take: number) {
    const where = this.buildWhere(filters);

    return this.prisma.$transaction([
      this.prisma.shop.count({ where }),
      this.prisma.shop.findMany({
        where,
        skip,
        take,
        include: shopInclude,
        orderBy: {
          createdAt: 'desc'
        }
      })
    ]);
  }

  findById(id: string) {
    return this.prisma.shop.findFirst({
      where: {
        id,
        deletedAt: null
      },
      include: shopInclude
    });
  }

  findBySlug(slug: string) {
    return this.prisma.shop.findFirst({
      where: {
        slug,
        deletedAt: null
      },
      select: {
        id: true
      }
    });
  }

  findOwnerCandidate(userId: string) {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
        deletedAt: null,
        status: {
          notIn: [UserStatus.DELETED, UserStatus.SUSPENDED]
        }
      },
      select: {
        id: true,
        role: true,
        userType: true,
        status: true
      }
    });
  }

  create(data: Prisma.ShopCreateInput) {
    return this.prisma.shop.create({
      data,
      include: shopInclude
    });
  }

  update(id: string, data: Prisma.ShopUpdateInput) {
    return this.prisma.shop.update({
      where: { id },
      data,
      include: shopInclude
    });
  }

  updateStatus(params: {
    shopId: string;
    actorUserId: string;
    fromStatus: ShopStatus;
    status: ShopStatus;
    verificationStatus?: ShopVerificationStatus;
    commissionStatus?: ShopCommissionStatus;
    reason?: string;
  }) {
    const now = new Date();

    return this.prisma.$transaction(async (tx) => {
      const shop = await tx.shop.update({
        where: { id: params.shopId },
        data: {
          status: params.status,
          verificationStatus: params.verificationStatus,
          commissionStatus: params.commissionStatus,
          approvedById:
            params.status === ShopStatus.ACTIVE ? params.actorUserId : undefined,
          approvedAt: params.status === ShopStatus.ACTIVE ? now : undefined
        },
        include: shopInclude
      });

      await tx.shopStatusHistory.create({
        data: {
          shopId: params.shopId,
          fromStatus: params.fromStatus,
          toStatus: params.status,
          reason: params.reason,
          changedById: params.actorUserId
        }
      });

      return shop;
    });
  }

  assignOwner(params: {
    shopId: string;
    ownerUserId: string;
    actorUserId: string;
  }) {
    return this.prisma.$transaction(async (tx) => {
      const shop = await tx.shop.update({
        where: { id: params.shopId },
        data: {
          ownerUserId: params.ownerUserId
        },
        include: shopInclude
      });

      await tx.shopTeamMember.upsert({
        where: {
          shopId_userId: {
            shopId: params.shopId,
            userId: params.ownerUserId
          }
        },
        update: {
          role: ShopTeamRole.OWNER,
          status: ShopTeamStatus.ACTIVE,
          deletedAt: null,
          joinedAt: new Date()
        },
        create: {
          shopId: params.shopId,
          userId: params.ownerUserId,
          role: ShopTeamRole.OWNER,
          status: ShopTeamStatus.ACTIVE,
          invitedById: params.actorUserId,
          joinedAt: new Date()
        }
      });

      const role = await tx.role.findUnique({
        where: { code: 'shop_owner' },
        select: { id: true }
      });

      if (role) {
        await tx.userRoleAssignment.upsert({
          where: {
            userId_roleId_shopId: {
              userId: params.ownerUserId,
              roleId: role.id,
              shopId: params.shopId
            }
          },
          update: {
            assignedById: params.actorUserId
          },
          create: {
            userId: params.ownerUserId,
            roleId: role.id,
            shopId: params.shopId,
            assignedById: params.actorUserId
          }
        });
      }

      await tx.user.update({
        where: { id: params.ownerUserId },
        data: {
          role: UserRole.SHOP_OWNER,
          userType: UserRole.SHOP_OWNER
        }
      });

      return shop;
    });
  }

  createAuditLog(data: Prisma.AuditLogCreateInput) {
    return this.prisma.auditLog.create({ data });
  }

  private buildWhere(filters: ShopFilterDto): Prisma.ShopWhereInput {
    return {
      deletedAt: null,
      status: filters.status,
      verificationStatus: filters.verificationStatus,
      commissionStatus: filters.commissionStatus,
      ownerUserId: filters.ownerUserId,
      primaryCategoryId: filters.primaryCategoryId,
      isFeatured: filters.isFeatured,
      OR: filters.search
        ? [
            { name: { contains: filters.search, mode: 'insensitive' } },
            { slug: { contains: filters.search, mode: 'insensitive' } },
            { legalName: { contains: filters.search, mode: 'insensitive' } },
            { email: { contains: filters.search, mode: 'insensitive' } },
            { phone: { contains: filters.search, mode: 'insensitive' } }
          ]
        : undefined
    };
  }
}

export type ShopWithRelations = NonNullable<
  Awaited<ReturnType<ShopsRepository['findById']>>
>;
