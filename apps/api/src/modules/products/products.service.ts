import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Prisma, ProductStatus } from '@prisma/client';
import type { PaginationResponse } from '../../common/responses/pagination-response.type';
import type { AuthenticatedUser } from '../../common/types/authenticated-user.type';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductStatusDto } from './dto/update-product-status.dto';
import { ProductsRepository, type ProductWithRelations } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async listPublic(
    filters: ProductFilterDto
  ): Promise<PaginationResponse<ProductResponseDto>> {
    this.validatePriceFilter(filters);

    const page = filters.page;
    const limit = filters.limit;
    const skip = (page - 1) * limit;
    const [total, products] = await this.productsRepository.listPublic(
      filters,
      skip,
      limit
    );

    return {
      success: true,
      message: 'Products fetched successfully',
      data: products.map((product) => this.toProductResponse(product)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findPublic(id: string): Promise<ProductResponseDto> {
    const product = await this.productsRepository.findPublicById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.toProductResponse(product);
  }

  async listForOwner(
    user: AuthenticatedUser,
    filters: ProductFilterDto
  ): Promise<PaginationResponse<ProductResponseDto>> {
    this.validatePriceFilter(filters);

    const shop = await this.getOwnedShopOrThrow(user.id);
    const page = filters.page;
    const limit = filters.limit;
    const skip = (page - 1) * limit;
    const [total, products] = await this.productsRepository.listForShop(
      shop.id,
      filters,
      skip,
      limit
    );

    return {
      success: true,
      message: 'Products fetched successfully',
      data: products.map((product) => this.toProductResponse(product)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async createForOwner(
    user: AuthenticatedUser,
    dto: CreateProductDto
  ): Promise<ProductResponseDto> {
    this.validatePricing(dto.basePrice, dto.compareAtPrice);
    const shop = await this.getOwnedShopOrThrow(user.id);
    const categoryIds = normalizeIds(dto.categoryIds);
    await this.ensureActiveCategories(categoryIds);

    const slug = await this.resolveUniqueSlug(shop.id, dto.slug ?? dto.title);
    const product = await this.productsRepository.createWithCategories(
      {
        shopId: shop.id,
        title: dto.title,
        slug,
        description: dto.description,
        shortDescription: dto.shortDescription,
        productType: dto.productType,
        sku: dto.sku,
        searchKeywords: normalizeStringArray(dto.searchKeywords),
        tags: normalizeStringArray(dto.tags),
        basePrice:
          dto.basePrice === undefined ? undefined : new Prisma.Decimal(dto.basePrice),
        compareAtPrice:
          dto.compareAtPrice === undefined
            ? undefined
            : new Prisma.Decimal(dto.compareAtPrice),
        currencyCode: dto.currencyCode?.toUpperCase(),
        taxRate:
          dto.taxRate === undefined ? undefined : new Prisma.Decimal(dto.taxRate),
        metadata: toJsonValue(dto.metadata ?? {})
      },
      categoryIds
    );

    return this.toProductResponse(product);
  }

  async findOwned(
    user: AuthenticatedUser,
    productId: string
  ): Promise<ProductResponseDto> {
    const product = await this.getOwnedProductOrThrow(user.id, productId);
    return this.toProductResponse(product);
  }

  async updateForOwner(
    user: AuthenticatedUser,
    productId: string,
    dto: UpdateProductDto
  ): Promise<ProductResponseDto> {
    const shop = await this.getOwnedShopOrThrow(user.id);
    const existingProduct = await this.getOwnedProductByShopOrThrow(shop.id, productId);
    this.validatePricing(
      dto.basePrice ?? decimalToNumber(existingProduct.basePrice),
      dto.compareAtPrice ?? decimalToNumber(existingProduct.compareAtPrice)
    );
    const categoryIds = dto.categoryIds ? normalizeIds(dto.categoryIds) : undefined;
    await this.ensureActiveCategories(categoryIds ?? []);

    const product = await this.productsRepository.updateWithCategories(
      productId,
      {
        title: dto.title,
        slug: dto.slug
          ? await this.resolveUniqueSlug(shop.id, dto.slug, existingProduct.id)
          : undefined,
        description: dto.description,
        shortDescription: dto.shortDescription,
        productType: dto.productType,
        sku: dto.sku,
        searchKeywords:
          dto.searchKeywords === undefined
            ? undefined
            : normalizeStringArray(dto.searchKeywords),
        tags: dto.tags === undefined ? undefined : normalizeStringArray(dto.tags),
        basePrice:
          dto.basePrice === undefined ? undefined : new Prisma.Decimal(dto.basePrice),
        compareAtPrice:
          dto.compareAtPrice === undefined
            ? undefined
            : new Prisma.Decimal(dto.compareAtPrice),
        currencyCode: dto.currencyCode?.toUpperCase(),
        taxRate:
          dto.taxRate === undefined ? undefined : new Prisma.Decimal(dto.taxRate),
        metadata:
          dto.metadata === undefined ? undefined : toJsonValue(dto.metadata ?? {})
      },
      categoryIds
    );

    return this.toProductResponse(product);
  }

  async deleteForOwner(
    user: AuthenticatedUser,
    productId: string
  ): Promise<ProductResponseDto> {
    const product = await this.getOwnedProductOrThrow(user.id, productId);
    const deletedProduct = await this.productsRepository.updateWithCategories(
      product.id,
      {
        deletedAt: new Date(),
        status: ProductStatus.ARCHIVED
      }
    );

    return this.toProductResponse(deletedProduct);
  }

  async updateStatusForOwner(
    user: AuthenticatedUser,
    productId: string,
    dto: UpdateProductStatusDto
  ): Promise<ProductResponseDto> {
    if (dto.status === ProductStatus.REJECTED) {
      throw new BadRequestException('Shop owners cannot reject products');
    }

    const product = await this.getOwnedProductOrThrow(user.id, productId);
    const updatedProduct = await this.productsRepository.updateWithCategories(
      product.id,
      {
        status: dto.status,
        publishedAt:
          dto.status === ProductStatus.ACTIVE && !product.publishedAt
            ? new Date()
            : undefined
      }
    );

    return this.toProductResponse(updatedProduct);
  }

  private async getOwnedProductOrThrow(ownerUserId: string, productId: string) {
    const shop = await this.getOwnedShopOrThrow(ownerUserId);
    return this.getOwnedProductByShopOrThrow(shop.id, productId);
  }

  private async getOwnedProductByShopOrThrow(shopId: string, productId: string) {
    const product = await this.productsRepository.findOwnedById(productId, shopId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  private async getOwnedShopOrThrow(ownerUserId: string) {
    const shop = await this.productsRepository.findOwnedShop(ownerUserId);

    if (!shop) {
      throw new NotFoundException('Owned shop not found');
    }

    return shop;
  }

  private async ensureActiveCategories(categoryIds: string[]) {
    if (categoryIds.length === 0) {
      return;
    }

    const activeCategoryCount =
      await this.productsRepository.countActiveCategories(categoryIds);

    if (activeCategoryCount !== categoryIds.length) {
      throw new BadRequestException('One or more categories are inactive or missing');
    }
  }

  private async resolveUniqueSlug(
    shopId: string,
    value: string,
    currentProductId?: string
  ) {
    const baseSlug = slugify(value);

    if (!baseSlug) {
      throw new BadRequestException('Product slug must contain letters or numbers');
    }

    let candidate = baseSlug;
    let suffix = 1;

    while (true) {
      const existingProduct = await this.productsRepository.findBySlug(
        shopId,
        candidate
      );

      if (!existingProduct || existingProduct.id === currentProductId) {
        return candidate;
      }

      suffix += 1;
      candidate = `${baseSlug}-${suffix}`;

      if (suffix > 100) {
        throw new ConflictException('Unable to generate a unique product slug');
      }
    }
  }

  private validatePriceFilter(filters: ProductFilterDto) {
    if (
      filters.minPrice !== undefined &&
      filters.maxPrice !== undefined &&
      filters.minPrice > filters.maxPrice
    ) {
      throw new BadRequestException('minPrice cannot be greater than maxPrice');
    }
  }

  private validatePricing(basePrice?: number | null, compareAtPrice?: number | null) {
    if (
      basePrice !== undefined &&
      basePrice !== null &&
      compareAtPrice !== undefined &&
      compareAtPrice !== null &&
      compareAtPrice < basePrice
    ) {
      throw new BadRequestException('compareAtPrice cannot be lower than basePrice');
    }
  }

  private toProductResponse(product: ProductWithRelations): ProductResponseDto {
    return {
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
    };
  }
}

const normalizeIds = (ids: string[] | undefined) => Array.from(new Set(ids ?? []));

const normalizeStringArray = (values: string[] | undefined) =>
  values
    ?.map((value) => value.trim())
    .filter(Boolean)
    .slice(0, 30) ?? [];

const decimalToNumber = (value: Prisma.Decimal | null) =>
  value === null ? null : value.toNumber();

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const toJsonValue = (value: unknown): Prisma.InputJsonValue =>
  JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
