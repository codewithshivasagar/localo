import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Prisma, ShopStatus, UserRole } from '@prisma/client';
import type { PaginationResponse } from '../../common/responses/pagination-response.type';
import type { AuthenticatedUser } from '../../common/types/authenticated-user.type';
import { CreateShopDto } from './dto/create-shop.dto';
import { ShopFilterDto } from './dto/shop-filter.dto';
import { ShopResponseDto } from './dto/shop-response.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { AssignShopOwnerDto } from './dto/assign-shop-owner.dto';
import { UpdateShopStatusDto } from './dto/update-shop-status.dto';
import { ShopsRepository, type ShopWithRelations } from './shops.repository';

@Injectable()
export class ShopsService {
  constructor(private readonly shopsRepository: ShopsRepository) {}

  async list(filters: ShopFilterDto): Promise<PaginationResponse<ShopResponseDto>> {
    const page = filters.page;
    const limit = filters.limit;
    const skip = (page - 1) * limit;
    const [total, shops] = await this.shopsRepository.list(filters, skip, limit);

    return {
      success: true,
      message: 'Shops fetched successfully',
      data: shops.map((shop) => this.toShopResponse(shop)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async create(
    dto: CreateShopDto,
    actor: AuthenticatedUser
  ): Promise<ShopResponseDto> {
    await this.ensureOwnerCandidate(dto.ownerUserId);

    const slug = await this.resolveUniqueSlug(dto.slug ?? dto.name);
    const shop = await this.shopsRepository.create({
      ownerUser: { connect: { id: dto.ownerUserId } },
      createdByAdmin: { connect: { id: actor.id } },
      name: dto.name,
      slug,
      legalName: dto.legalName,
      description: dto.description,
      primaryCategory: dto.primaryCategoryId
        ? { connect: { id: dto.primaryCategoryId } }
        : undefined,
      logoMedia: dto.logoMediaId ? { connect: { id: dto.logoMediaId } } : undefined,
      coverMedia: dto.coverMediaId
        ? { connect: { id: dto.coverMediaId } }
        : undefined,
      phone: dto.phone,
      email: dto.email,
      websiteUrl: dto.websiteUrl,
      isFeatured: dto.isFeatured
    });

    const assignedShop = await this.assignOwnerById(shop.id, dto.ownerUserId, actor);
    await this.audit(actor.id, 'shops.created', assignedShop.id, null, assignedShop);

    return assignedShop;
  }

  async findOne(id: string): Promise<ShopResponseDto> {
    const shop = await this.getExistingShop(id);
    return this.toShopResponse(shop);
  }

  async update(
    id: string,
    dto: UpdateShopDto,
    actor: AuthenticatedUser
  ): Promise<ShopResponseDto> {
    const existingShop = await this.getExistingShop(id);
    const data: Prisma.ShopUpdateInput = {
      name: dto.name,
      slug: dto.slug ? await this.resolveUniqueSlug(dto.slug, id) : undefined,
      legalName: dto.legalName,
      description: dto.description,
      primaryCategory: dto.primaryCategoryId
        ? { connect: { id: dto.primaryCategoryId } }
        : undefined,
      logoMedia: dto.logoMediaId ? { connect: { id: dto.logoMediaId } } : undefined,
      coverMedia: dto.coverMediaId
        ? { connect: { id: dto.coverMediaId } }
        : undefined,
      phone: dto.phone,
      email: dto.email,
      websiteUrl: dto.websiteUrl,
      isFeatured: dto.isFeatured
    };

    const shop = await this.shopsRepository.update(id, data);
    await this.audit(actor.id, 'shops.updated', id, existingShop, shop);

    return this.toShopResponse(shop);
  }

  async updateStatus(
    id: string,
    dto: UpdateShopStatusDto,
    actor: AuthenticatedUser
  ): Promise<ShopResponseDto> {
    const existingShop = await this.getExistingShop(id);
    const shop = await this.shopsRepository.updateStatus({
      shopId: id,
      actorUserId: actor.id,
      fromStatus: existingShop.status,
      status: dto.status,
      verificationStatus: dto.verificationStatus,
      commissionStatus: dto.commissionStatus,
      reason: dto.reason
    });

    await this.audit(actor.id, 'shops.status_updated', id, existingShop, shop);

    return this.toShopResponse(shop);
  }

  async assignOwner(
    id: string,
    dto: AssignShopOwnerDto,
    actor: AuthenticatedUser
  ): Promise<ShopResponseDto> {
    await this.getExistingShop(id);
    const shop = await this.assignOwnerById(id, dto.ownerUserId, actor);

    return shop;
  }

  private async assignOwnerById(
    shopId: string,
    ownerUserId: string,
    actor: AuthenticatedUser
  ): Promise<ShopResponseDto> {
    await this.ensureOwnerCandidate(ownerUserId);

    const existingShop = await this.getExistingShop(shopId);
    const shop = await this.shopsRepository.assignOwner({
      shopId,
      ownerUserId,
      actorUserId: actor.id
    });

    await this.audit(actor.id, 'shops.owner_assigned', shopId, existingShop, shop);

    return this.toShopResponse(shop);
  }

  private async ensureOwnerCandidate(userId: string) {
    const user = await this.shopsRepository.findOwnerCandidate(userId);

    if (!user) {
      throw new NotFoundException('Shop owner user not found');
    }

    if (user.role === UserRole.CUSTOMER || user.role === UserRole.SHOP_OWNER) {
      return;
    }

    throw new BadRequestException('Only customer or shop owner users can own shops');
  }

  private async getExistingShop(id: string) {
    const shop = await this.shopsRepository.findById(id);

    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    return shop;
  }

  private async resolveUniqueSlug(value: string, currentShopId?: string) {
    const baseSlug = slugify(value);

    if (!baseSlug) {
      throw new BadRequestException('Shop slug must contain letters or numbers');
    }

    let candidate = baseSlug;
    let suffix = 1;

    while (true) {
      const existingShop = await this.shopsRepository.findBySlug(candidate);

      if (!existingShop || existingShop.id === currentShopId) {
        return candidate;
      }

      suffix += 1;
      candidate = `${baseSlug}-${suffix}`;

      if (suffix > 100) {
        throw new ConflictException('Unable to generate a unique shop slug');
      }
    }
  }

  private toShopResponse(shop: ShopWithRelations): ShopResponseDto {
    return {
      id: shop.id,
      ownerUserId: shop.ownerUserId,
      name: shop.name,
      slug: shop.slug,
      legalName: shop.legalName,
      description: shop.description,
      primaryCategoryId: shop.primaryCategoryId,
      status: shop.status,
      verificationStatus: shop.verificationStatus,
      commissionStatus: shop.commissionStatus,
      phone: shop.phone,
      email: shop.email,
      websiteUrl: shop.websiteUrl,
      ratingAvg: shop.ratingAvg.toString(),
      ratingCount: shop.ratingCount,
      isFeatured: shop.isFeatured,
      approvedById: shop.approvedById,
      approvedAt: shop.approvedAt?.toISOString() ?? null,
      createdAt: shop.createdAt.toISOString(),
      updatedAt: shop.updatedAt.toISOString(),
      owner: {
        id: shop.ownerUser.id,
        email: shop.ownerUser.email,
        fullName: shop.ownerUser.fullName,
        phone: shop.ownerUser.phone
      },
      primaryCategory: shop.primaryCategory
        ? {
            id: shop.primaryCategory.id,
            name: shop.primaryCategory.name,
            slug: shop.primaryCategory.slug
          }
        : null
    };
  }

  private async audit(
    actorUserId: string,
    action: string,
    entityId: string,
    oldValues: unknown,
    newValues: unknown
  ) {
    await this.shopsRepository.createAuditLog({
      actorUser: { connect: { id: actorUserId } },
      action,
      entityType: 'shops',
      entityId,
      oldValues: oldValues === null ? undefined : toJsonValue(oldValues),
      newValues: toJsonValue(newValues)
    });
  }
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const toJsonValue = (value: unknown): Prisma.InputJsonValue =>
  JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
