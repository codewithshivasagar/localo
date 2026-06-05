import { Inject, Injectable } from '@nestjs/common';
import {
  Prisma,
  ProductStatus,
  ShopStatus
} from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import type { ProductFilterDto } from '../products/dto/product-filter.dto';
import type { ShopDiscoveryFilterDto } from './dto/shop-discovery-filter.dto';

const publicShopInclude = {
  primaryCategory: {
    select: {
      id: true,
      name: true,
      slug: true,
      isActive: true
    }
  },
  logoMedia: {
    select: {
      id: true,
      publicUrl: true,
      altText: true
    }
  },
  coverMedia: {
    select: {
      id: true,
      publicUrl: true,
      altText: true
    }
  },
  categories: {
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
          isActive: true
        }
      }
    },
    orderBy: [{ isPrimary: 'desc' }, { createdAt: 'asc' }]
  },
  locations: {
    include: {
      area: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      },
      city: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      },
      state: {
        select: {
          id: true,
          name: true
        }
      },
      country: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: [{ isPrimary: 'desc' }, { createdAt: 'asc' }]
  },
  businessHours: {
    orderBy: { dayOfWeek: 'asc' }
  }
} satisfies Prisma.ShopInclude;

const publicProductInclude = {
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
  },
  shop: {
    select: {
      id: true,
      name: true,
      slug: true
    }
  }
} satisfies Prisma.ProductInclude;

@Injectable()
export class DiscoveryRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  listShops(
    filters: ShopDiscoveryFilterDto,
    skip: number,
    take: number,
    openNow?: OpenNowFilter
  ) {
    const where = this.buildPublicShopWhere(filters, openNow);

    return this.prisma.$transaction([
      this.prisma.shop.count({ where }),
      this.prisma.shop.findMany({
        where,
        skip,
        take,
        include: publicShopInclude,
        orderBy: this.buildShopOrderBy(filters)
      })
    ]);
  }

  findShopBySlug(slug: string) {
    return this.prisma.shop.findFirst({
      where: {
        slug,
        ...publicShopBaseWhere()
      },
      include: publicShopInclude
    });
  }

  listShopProducts(
    shopId: string,
    filters: ProductFilterDto,
    skip: number,
    take: number
  ) {
    const where = this.buildPublicProductWhere({ ...filters, shopId });

    return this.prisma.$transaction([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        skip,
        take,
        include: publicProductInclude,
        orderBy: this.buildProductOrderBy(filters)
      })
    ]);
  }

  shopExists(shopId: string) {
    return this.prisma.shop.findFirst({
      where: {
        id: shopId,
        ...publicShopBaseWhere()
      },
      select: {
        id: true
      }
    });
  }

  private buildPublicShopWhere(
    filters: ShopDiscoveryFilterDto,
    openNow?: OpenNowFilter
  ): Prisma.ShopWhereInput {
    const search = filters.search?.trim();
    const location = filters.location?.trim();
    const baseWhere = publicShopBaseWhere();
    const andFilters: Prisma.ShopWhereInput[] = [];

    if (filters.categoryId) {
      andFilters.push({
        OR: [
          {
            primaryCategoryId: filters.categoryId,
            primaryCategory: {
              isActive: true
            }
          },
          {
            categories: {
              some: {
                categoryId: filters.categoryId,
                category: {
                  isActive: true
                }
              }
            }
          }
        ]
      });
    }

    if (search) {
      andFilters.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { slug: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          {
            primaryCategory: {
              name: { contains: search, mode: 'insensitive' }
            }
          },
          {
            categories: {
              some: {
                category: {
                  name: { contains: search, mode: 'insensitive' },
                  isActive: true
                }
              }
            }
          }
        ]
      });
    }

    return {
      ...baseWhere,
      status:
        filters.status && filters.status !== ShopStatus.ACTIVE
          ? filters.status
          : baseWhere.status,
      AND: andFilters.length > 0 ? andFilters : undefined,
      businessHours: openNow
        ? {
            some: {
              dayOfWeek: openNow.dayOfWeek,
              isClosed: false,
              opensAt: {
                lte: openNow.time
              },
              closesAt: {
                gte: openNow.time
              }
            }
          }
        : undefined,
      locations:
        filters.cityId || filters.areaId || location
          ? {
              some: {
                cityId: filters.cityId,
                areaId: filters.areaId,
                OR: location
                  ? [
                      {
                        addressLine1: {
                          contains: location,
                          mode: 'insensitive'
                        }
                      },
                      {
                        addressLine2: {
                          contains: location,
                          mode: 'insensitive'
                        }
                      },
                      {
                        pincode: {
                          contains: location,
                          mode: 'insensitive'
                        }
                      },
                      {
                        city: {
                          name: {
                            contains: location,
                            mode: 'insensitive'
                          }
                        }
                      },
                      {
                        area: {
                          name: {
                            contains: location,
                            mode: 'insensitive'
                          }
                        }
                      }
                    ]
                  : undefined
              }
            }
          : undefined,
    };
  }

  private buildPublicProductWhere(filters: ProductFilterDto): Prisma.ProductWhereInput {
    const tags = parseTags(filters.tags);
    const minPrice = filters.priceMin ?? filters.minPrice;
    const maxPrice = filters.priceMax ?? filters.maxPrice;

    return {
      deletedAt: null,
      shopId: filters.shopId,
      status: ProductStatus.ACTIVE,
      shop: publicShopBaseWhere(),
      categoryLinks: filters.categoryId
        ? {
            some: {
              categoryId: filters.categoryId,
              category: {
                isActive: true
              }
            }
          }
        : undefined,
      basePrice:
        minPrice !== undefined || maxPrice !== undefined
          ? {
              gte: minPrice === undefined ? undefined : new Prisma.Decimal(minPrice),
              lte: maxPrice === undefined ? undefined : new Prisma.Decimal(maxPrice)
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
            { searchKeywords: { has: filters.search } },
            { tags: { has: filters.search } }
          ]
        : undefined
    };
  }

  private buildShopOrderBy(filters: ShopDiscoveryFilterDto): Prisma.ShopOrderByWithRelationInput[] {
    const sortOrder = filters.sortOrder ?? 'desc';

    switch (filters.sortBy) {
      case 'name':
        return [{ name: sortOrder }];
      case 'newest':
        return [{ createdAt: sortOrder }];
      case 'rating':
        return [{ ratingAvg: sortOrder }, { ratingCount: 'desc' }];
      case 'featured':
      default:
        return [{ isFeatured: 'desc' }, { ratingAvg: 'desc' }, { createdAt: 'desc' }];
    }
  }

  private buildProductOrderBy(
    filters: ProductFilterDto
  ): Prisma.ProductOrderByWithRelationInput[] {
    const sortOrder = filters.sortOrder ?? 'desc';

    switch (filters.sortBy) {
      case 'price':
        return [{ basePrice: sortOrder }, { createdAt: 'desc' }];
      case 'rating':
        return [{ ratingAvg: sortOrder }, { ratingCount: 'desc' }];
      case 'title':
        return [{ title: sortOrder }];
      case 'newest':
        return [{ createdAt: sortOrder }];
      case 'featured':
      default:
        return [{ isFeatured: 'desc' }, { createdAt: 'desc' }];
    }
  }
}

const publicShopBaseWhere = (): Prisma.ShopWhereInput => ({
  deletedAt: null,
  status: ShopStatus.ACTIVE,
  approvedAt: {
    not: null
  }
});

const parseTags = (tags?: string) =>
  tags
    ?.split(',')
    .map((tag) => tag.trim())
    .filter(Boolean) ?? [];

export interface OpenNowFilter {
  dayOfWeek: number;
  time: Date;
}

export type PublicShopWithRelations = NonNullable<
  Awaited<ReturnType<DiscoveryRepository['findShopBySlug']>>
>;

export type PublicProductWithRelations = NonNullable<
  Awaited<ReturnType<DiscoveryRepository['listShopProducts']>>[1][number]
>;
