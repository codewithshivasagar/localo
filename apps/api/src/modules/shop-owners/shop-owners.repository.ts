import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

const ownerShopInclude = {
  locations: {
    where: {
      isPrimary: true
    },
    take: 1,
    orderBy: {
      createdAt: 'asc'
    }
  },
  businessHours: {
    orderBy: {
      dayOfWeek: 'asc'
    }
  }
} satisfies Prisma.ShopInclude;

@Injectable()
export class ShopOwnersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findOwnedShop(ownerUserId: string) {
    return this.prisma.shop.findFirst({
      where: {
        ownerUserId,
        deletedAt: null
      },
      include: ownerShopInclude,
      orderBy: {
        createdAt: 'asc'
      }
    });
  }

  updateOwnedShop(shopId: string, data: Prisma.ShopUpdateInput) {
    return this.prisma.shop.update({
      where: { id: shopId },
      data,
      include: ownerShopInclude
    });
  }

  upsertPrimaryLocation(
    shopId: string,
    data: Omit<Prisma.ShopLocationUncheckedCreateInput, 'shopId' | 'isPrimary'>
  ) {
    return this.prisma.$transaction(async (tx) => {
      const existingLocation = await tx.shopLocation.findFirst({
        where: {
          shopId,
          isPrimary: true
        },
        orderBy: {
          createdAt: 'asc'
        },
        select: {
          id: true
        }
      });

      if (existingLocation) {
        await tx.shopLocation.update({
          where: { id: existingLocation.id },
          data
        });
      } else {
        await tx.shopLocation.create({
          data: {
            ...data,
            shopId,
            isPrimary: true
          }
        });
      }

      return tx.shop.findUniqueOrThrow({
        where: { id: shopId },
        include: ownerShopInclude
      });
    });
  }

  replaceBusinessHours(
    shopId: string,
    businessHours: Array<{
      dayOfWeek: number;
      opensAt: Date | null;
      closesAt: Date | null;
      isClosed: boolean;
    }>
  ) {
    return this.prisma.$transaction(async (tx) => {
      for (const businessHour of businessHours) {
        await tx.shopBusinessHour.upsert({
          where: {
            shopId_dayOfWeek: {
              shopId,
              dayOfWeek: businessHour.dayOfWeek
            }
          },
          update: {
            opensAt: businessHour.opensAt,
            closesAt: businessHour.closesAt,
            isClosed: businessHour.isClosed
          },
          create: {
            shopId,
            dayOfWeek: businessHour.dayOfWeek,
            opensAt: businessHour.opensAt,
            closesAt: businessHour.closesAt,
            isClosed: businessHour.isClosed
          }
        });
      }

      return tx.shop.findUniqueOrThrow({
        where: { id: shopId },
        include: ownerShopInclude
      });
    });
  }
}

export type OwnerShopWithRelations = NonNullable<
  Awaited<ReturnType<ShopOwnersRepository['findOwnedShop']>>
>;
