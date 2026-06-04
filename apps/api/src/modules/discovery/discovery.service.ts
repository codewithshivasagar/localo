import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductStatus, ShopStatus } from '@prisma/client';
import type { PaginationResponse } from '../../common/responses/pagination-response.type';
import { ProductFilterDto } from '../products/dto/product-filter.dto';
import { ProductResponseDto } from '../products/dto/product-response.dto';
import {
  DiscoveryRepository,
  type PublicProductWithRelations,
  type PublicShopWithRelations
} from './discovery.repository';
import { ShopDiscoveryFilterDto } from './dto/shop-discovery-filter.dto';
import {
  PublicShopBusinessHourResponseDto,
  PublicShopResponseDto
} from './dto/public-shop-response.dto';

@Injectable()
export class DiscoveryService {
  constructor(private readonly discoveryRepository: DiscoveryRepository) {}

  async listShops(
    filters: ShopDiscoveryFilterDto
  ): Promise<PaginationResponse<PublicShopResponseDto>> {
    this.ensurePublicShopStatus(filters.status);

    const page = filters.page;
    const limit = filters.limit;
    const skip = (page - 1) * limit;
    const openNow = filters.openNow ? buildOpenNowFilter(new Date()) : undefined;
    const [total, shops] = await this.discoveryRepository.listShops(
      filters,
      skip,
      limit,
      openNow
    );

    return {
      success: true,
      message: 'Shops fetched successfully',
      data: shops.map((shop) => this.toPublicShopResponse(shop)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findShopBySlug(slug: string): Promise<PublicShopResponseDto> {
    const shop = await this.discoveryRepository.findShopBySlug(slug);

    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    return this.toPublicShopResponse(shop);
  }

  async listShopProducts(
    shopId: string,
    filters: ProductFilterDto
  ): Promise<PaginationResponse<ProductResponseDto>> {
    this.ensurePublicProductStatus(filters);
    this.validatePriceFilter(filters);

    const shop = await this.discoveryRepository.shopExists(shopId);

    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    const page = filters.page;
    const limit = filters.limit;
    const skip = (page - 1) * limit;
    const [total, products] = await this.discoveryRepository.listShopProducts(
      shopId,
      filters,
      skip,
      limit
    );

    return {
      success: true,
      message: 'Shop products fetched successfully',
      data: products.map((product) => toPublicProductResponse(product)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  private ensurePublicShopStatus(status?: ShopStatus) {
    if (status && status !== ShopStatus.ACTIVE) {
      throw new BadRequestException('Public discovery only supports ACTIVE shops');
    }
  }

  private ensurePublicProductStatus(filters: ProductFilterDto) {
    const status = filters.visibility ?? filters.status;

    if (status && status !== ProductStatus.ACTIVE) {
      throw new BadRequestException('Public discovery only supports ACTIVE products');
    }
  }

  private validatePriceFilter(filters: ProductFilterDto) {
    const minPrice = filters.priceMin ?? filters.minPrice;
    const maxPrice = filters.priceMax ?? filters.maxPrice;

    if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
      throw new BadRequestException('priceMin cannot be greater than priceMax');
    }
  }

  private toPublicShopResponse(shop: PublicShopWithRelations): PublicShopResponseDto {
    return {
      id: shop.id,
      name: shop.name,
      slug: shop.slug,
      description: shop.description,
      phone: shop.phone,
      email: shop.email,
      websiteUrl: shop.websiteUrl,
      ratingAvg: shop.ratingAvg.toString(),
      ratingCount: shop.ratingCount,
      isFeatured: shop.isFeatured,
      isOpenNow: isShopOpenNow(shop.businessHours, new Date()),
      logoMedia: shop.logoMedia
        ? {
            id: shop.logoMedia.id,
            publicUrl: shop.logoMedia.publicUrl,
            altText: shop.logoMedia.altText
          }
        : null,
      coverMedia: shop.coverMedia
        ? {
            id: shop.coverMedia.id,
            publicUrl: shop.coverMedia.publicUrl,
            altText: shop.coverMedia.altText
          }
        : null,
      categories: [
        ...(shop.primaryCategory?.isActive
          ? [
              {
                id: shop.primaryCategory.id,
                name: shop.primaryCategory.name,
                slug: shop.primaryCategory.slug,
                isPrimary: true
              }
            ]
          : []),
        ...shop.categories
          .filter((shopCategory) => shopCategory.category.isActive)
          .filter(
            (shopCategory) => shopCategory.categoryId !== shop.primaryCategory?.id
          )
          .map((shopCategory) => ({
            id: shopCategory.category.id,
            name: shopCategory.category.name,
            slug: shopCategory.category.slug,
            isPrimary: shopCategory.isPrimary
          }))
      ],
      locations: shop.locations.map((location) => ({
        id: location.id,
        label: location.label,
        addressLine1: location.addressLine1,
        addressLine2: location.addressLine2,
        areaId: location.areaId,
        areaName: location.area?.name ?? null,
        cityId: location.cityId,
        cityName: location.city?.name ?? null,
        stateName: location.state?.name ?? null,
        countryName: location.country?.name ?? null,
        pincode: location.pincode,
        latitude: location.latitude.toString(),
        longitude: location.longitude.toString(),
        isPrimary: location.isPrimary
      })),
      businessHours: shop.businessHours.map(toBusinessHourResponse),
      createdAt: shop.createdAt.toISOString(),
      updatedAt: shop.updatedAt.toISOString()
    };
  }
}

const toPublicProductResponse = (
  product: PublicProductWithRelations
): ProductResponseDto => ({
  id: product.id,
  shopId: product.shopId,
  title: product.title,
  slug: product.slug,
  description: product.description,
  shortDescription: product.shortDescription,
  productType: product.productType,
  status: product.status,
  sku: product.sku,
  searchKeywords: product.searchKeywords,
  tags: product.tags,
  basePrice: product.basePrice?.toString() ?? null,
  compareAtPrice: product.compareAtPrice?.toString() ?? null,
  currencyCode: product.currencyCode,
  taxRate: product.taxRate.toString(),
  isFeatured: product.isFeatured,
  ratingAvg: product.ratingAvg.toString(),
  ratingCount: product.ratingCount,
  publishedAt: product.publishedAt?.toISOString() ?? null,
  createdAt: product.createdAt.toISOString(),
  updatedAt: product.updatedAt.toISOString(),
  shop: {
    id: product.shop.id,
    name: product.shop.name,
    slug: product.shop.slug
  },
  categories: product.categoryLinks.map((categoryLink) => ({
    id: categoryLink.category.id,
    name: categoryLink.category.name,
    slug: categoryLink.category.slug,
    isPrimary: categoryLink.isPrimary
  })),
  media: product.media.map((productMedia) => ({
    id: productMedia.id,
    mediaId: productMedia.mediaId,
    publicUrl: productMedia.media.publicUrl,
    altText: productMedia.media.altText,
    sortOrder: productMedia.sortOrder,
    isPrimary: productMedia.isPrimary
  }))
});

const toBusinessHourResponse = (
  businessHour: PublicShopWithRelations['businessHours'][number]
): PublicShopBusinessHourResponseDto => ({
  dayOfWeek: businessHour.dayOfWeek,
  opensAt: formatBusinessTime(businessHour.opensAt),
  closesAt: formatBusinessTime(businessHour.closesAt),
  isClosed: businessHour.isClosed
});

const buildOpenNowFilter = (now: Date) => ({
  dayOfWeek: now.getDay(),
  time: timeOnlyDate(now)
});

const isShopOpenNow = (
  businessHours: PublicShopWithRelations['businessHours'],
  now: Date
) => {
  const openNow = buildOpenNowFilter(now);
  const todayHours = businessHours.find(
    (businessHour) => businessHour.dayOfWeek === openNow.dayOfWeek
  );

  if (!todayHours || todayHours.isClosed || !todayHours.opensAt || !todayHours.closesAt) {
    return false;
  }

  const opensAt = timeOnlyDate(todayHours.opensAt);
  const closesAt = timeOnlyDate(todayHours.closesAt);

  // TODO: Add shop timezone and overnight-hours handling when those rules are modeled.
  return opensAt <= openNow.time && closesAt >= openNow.time;
};

const timeOnlyDate = (value: Date) =>
  new Date(
    Date.UTC(
      1970,
      0,
      1,
      value.getHours(),
      value.getMinutes(),
      value.getSeconds(),
      value.getMilliseconds()
    )
  );

const formatBusinessTime = (value: Date | null) =>
  value ? value.toISOString().slice(11, 16) : null;
