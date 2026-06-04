import { Injectable } from '@nestjs/common';
import { Prisma, ProductStatus, ShopStatus } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import type { ProductFilterDto } from './dto/product-filter.dto';

const productInclude = {
  shop: {
    select: {
      id: true,
      name: true,
      slug: true
    }
  },
  categoryLinks: {
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      }
    },
    orderBy: [{ isPrimary: 'desc' }, { createdAt: 'asc' }]
  },
  media: {
    include: {
      media: {
        select: {
          id: true,
          publicUrl: true,
          altText: true
        }
      }
    },
    orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }]
  }
} satisfies Prisma.ProductInclude;

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  listPublic(filters: ProductFilterDto, skip: number, take: number) {
    const where = this.buildWhere(filters, true);

    return this.prisma.$transaction([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        skip,
        take,
        include: productInclude,
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }]
      })
    ]);
  }

  listForShop(shopId: string, filters: ProductFilterDto, skip: number, take: number) {
    const where = this.buildWhere({ ...filters, shopId }, false);

    return this.prisma.$transaction([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        skip,
        take,
        include: productInclude,
        orderBy: { createdAt: 'desc' }
      })
    ]);
  }

  findPublicById(id: string) {
    return this.prisma.product.findFirst({
      where: {
        id,
        deletedAt: null,
        status: ProductStatus.ACTIVE,
        shop: {
          deletedAt: null,
          status: ShopStatus.ACTIVE
        }
      },
      include: productInclude
    });
  }

  findOwnedById(productId: string, shopId: string) {
    return this.prisma.product.findFirst({
      where: {
        id: productId,
        shopId,
        deletedAt: null
      },
      include: productInclude
    });
  }

  findBySlug(shopId: string, slug: string) {
    return this.prisma.product.findFirst({
      where: {
        shopId,
        slug,
        deletedAt: null
      },
      select: {
        id: true
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
        id: true
      }
    });
  }

  countActiveCategories(categoryIds: string[]) {
    return this.prisma.category.count({
      where: {
        id: {
          in: categoryIds
        },
        isActive: true
      }
    });
  }

  createWithCategories(
    data: Prisma.ProductUncheckedCreateInput,
    categoryIds: string[]
  ) {
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.create({ data });

      if (categoryIds.length > 0) {
        await tx.productCategoryLink.createMany({
          data: categoryIds.map((categoryId, index) => ({
            productId: product.id,
            categoryId,
            isPrimary: index === 0
          })),
          skipDuplicates: true
        });
      }

      return tx.product.findUniqueOrThrow({
        where: { id: product.id },
        include: productInclude
      });
    });
  }

  updateWithCategories(
    productId: string,
    data: Prisma.ProductUncheckedUpdateInput,
    categoryIds?: string[]
  ) {
    return this.prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id: productId },
        data
      });

      if (categoryIds) {
        await tx.productCategoryLink.deleteMany({
          where: { productId }
        });

        if (categoryIds.length > 0) {
          await tx.productCategoryLink.createMany({
            data: categoryIds.map((categoryId, index) => ({
              productId,
              categoryId,
              isPrimary: index === 0
            })),
            skipDuplicates: true
          });
        }
      }

      return tx.product.findUniqueOrThrow({
        where: { id: productId },
        include: productInclude
      });
    });
  }

  private buildWhere(
    filters: ProductFilterDto,
    publicOnly: boolean
  ): Prisma.ProductWhereInput {
    const tags = parseTags(filters.tags);
    const status = publicOnly
      ? ProductStatus.ACTIVE
      : filters.visibility ?? filters.status;

    return {
      deletedAt: null,
      shopId: filters.shopId,
      status,
      shop: publicOnly
        ? {
            deletedAt: null,
            status: ShopStatus.ACTIVE
          }
        : undefined,
      categoryLinks: filters.categoryId
        ? {
            some: {
              categoryId: filters.categoryId
            }
          }
        : undefined,
      basePrice:
        filters.minPrice !== undefined || filters.maxPrice !== undefined
          ? {
              gte:
                filters.minPrice === undefined
                  ? undefined
                  : new Prisma.Decimal(filters.minPrice),
              lte:
                filters.maxPrice === undefined
                  ? undefined
                  : new Prisma.Decimal(filters.maxPrice)
            }
          : undefined,
      compareAtPrice:
        filters.hasDiscount === true
          ? { not: null }
          : filters.hasDiscount === false
            ? null
            : undefined,
      tags: tags.length > 0 ? { hasSome: tags } : undefined,
      OR: filters.search
        ? [
            { title: { contains: filters.search, mode: 'insensitive' } },
            { slug: { contains: filters.search, mode: 'insensitive' } },
            { description: { contains: filters.search, mode: 'insensitive' } },
            {
              shortDescription: {
                contains: filters.search,
                mode: 'insensitive'
              }
            },
            { sku: { contains: filters.search, mode: 'insensitive' } },
            { searchKeywords: { has: filters.search } },
            { tags: { has: filters.search } }
          ]
        : undefined
    };
  }
}

const parseTags = (tags?: string) =>
  tags
    ?.split(',')
    .map((tag) => tag.trim())
    .filter(Boolean) ?? [];

export type ProductWithRelations = NonNullable<
  Awaited<ReturnType<ProductsRepository['findPublicById']>>
>;
