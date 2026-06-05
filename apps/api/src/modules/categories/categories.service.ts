import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { normalizePagination } from '../../common/pagination/pagination';
import type { PaginationResponse } from '../../common/responses/pagination-response.type';
import type { AuthenticatedUser } from '../../common/types/authenticated-user.type';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { CategoriesRepository, type CategoryWithRelations } from './categories.repository';
import { CategoryFilterDto } from './dto/category-filter.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CategoriesRepository) private readonly categoriesRepository: CategoriesRepository,
    @Inject(AuditLogsService) private readonly auditLogsService: AuditLogsService
  ) {}

  async listPublic(
    filters: CategoryFilterDto
  ): Promise<PaginationResponse<CategoryResponseDto>> {
    const { page, limit, skip } = normalizePagination(filters.page, filters.limit, {
      defaultPage: 1,
      defaultLimit: 10,
      maxLimit: 100
    });
    const [total, categories] = await this.categoriesRepository.list(
      filters,
      skip,
      limit,
      true
    );

    return {
      success: true,
      message: 'Categories fetched successfully',
      data: categories.map((category) => this.toCategoryResponse(category)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findPublic(id: string): Promise<CategoryResponseDto> {
    const category = await this.getCategoryOrThrow(id, true);
    return this.toCategoryResponse(category);
  }

  async create(
    dto: CreateCategoryDto,
    actor?: AuthenticatedUser
  ): Promise<CategoryResponseDto> {
    const parent = dto.parentId
      ? await this.getCategoryOrThrow(dto.parentId, false)
      : null;
    const slug = await this.resolveUniqueSlug(dto.slug ?? dto.name, dto.parentId);
    const category = await this.categoriesRepository.create({
      name: dto.name,
      slug,
      description: dto.description,
      parent: dto.parentId ? { connect: { id: dto.parentId } } : undefined,
      iconMedia: dto.iconMediaId ? { connect: { id: dto.iconMediaId } } : undefined,
      imageMedia: dto.imageMediaId
        ? { connect: { id: dto.imageMediaId } }
        : undefined,
      level: parent ? parent.level + 1 : 0,
      sortOrder: dto.sortOrder,
      isActive: dto.isActive,
      metadata: toJsonValue(dto.metadata ?? {})
    });

    const response = this.toCategoryResponse(category);
    await this.auditLogsService.recordSafe({
      actorUserId: actor?.id,
      action: 'categories.created',
      entityType: 'categories',
      entityId: category.id,
      newValues: response
    });

    return response;
  }

  async update(
    id: string,
    dto: UpdateCategoryDto,
    actor?: AuthenticatedUser
  ): Promise<CategoryResponseDto> {
    const existingCategory = await this.getCategoryOrThrow(id, false);
    const parent = await this.resolveParent(id, dto.parentId);
    const parentId = dto.parentId === undefined ? existingCategory.parentId : dto.parentId;

    const data: Prisma.CategoryUpdateInput = {
      name: dto.name,
      slug:
        dto.slug || dto.parentId !== undefined
          ? await this.resolveUniqueSlug(dto.slug ?? existingCategory.slug, parentId, id)
          : undefined,
      description: dto.description,
      parent:
        dto.parentId === undefined
          ? undefined
          : dto.parentId
            ? { connect: { id: dto.parentId } }
            : { disconnect: true },
      iconMedia:
        dto.iconMediaId === undefined
          ? undefined
          : dto.iconMediaId
            ? { connect: { id: dto.iconMediaId } }
            : { disconnect: true },
      imageMedia:
        dto.imageMediaId === undefined
          ? undefined
          : dto.imageMediaId
            ? { connect: { id: dto.imageMediaId } }
            : { disconnect: true },
      level: dto.parentId === undefined ? undefined : parent ? parent.level + 1 : 0,
      sortOrder: dto.sortOrder,
      isActive: dto.isActive,
      metadata:
        dto.metadata === undefined ? undefined : toJsonValue(dto.metadata ?? {})
    };

    const category = await this.categoriesRepository.update(id, data);
    const response = this.toCategoryResponse(category);
    await this.auditLogsService.recordSafe({
      actorUserId: actor?.id,
      action: 'categories.updated',
      entityType: 'categories',
      entityId: id,
      oldValues: this.toCategoryResponse(existingCategory),
      newValues: response
    });

    return response;
  }

  async deactivate(id: string, actor?: AuthenticatedUser): Promise<CategoryResponseDto> {
    const existingCategory = await this.getCategoryOrThrow(id, false);
    const category = await this.categoriesRepository.update(id, {
      isActive: false
    });

    const response = this.toCategoryResponse(category);
    await this.auditLogsService.recordSafe({
      actorUserId: actor?.id,
      action: 'categories.deactivated',
      entityType: 'categories',
      entityId: id,
      oldValues: this.toCategoryResponse(existingCategory),
      newValues: response
    });

    return response;
  }

  private async resolveParent(id: string, parentId?: string) {
    if (parentId === undefined || parentId === null) {
      return null;
    }

    if (parentId === id) {
      throw new BadRequestException('Category cannot be its own parent');
    }

    return this.getCategoryOrThrow(parentId, false);
  }

  private async getCategoryOrThrow(id: string, publicOnly: boolean) {
    const category = await this.categoriesRepository.findById(id, publicOnly);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  private async resolveUniqueSlug(
    value: string,
    parentId?: string | null,
    currentCategoryId?: string
  ) {
    const baseSlug = slugify(value);

    if (!baseSlug) {
      throw new BadRequestException('Category slug must contain letters or numbers');
    }

    let candidate = baseSlug;
    let suffix = 1;

    while (true) {
      const existingCategory =
        await this.categoriesRepository.findBySlugWithinParent(candidate, parentId);

      if (!existingCategory || existingCategory.id === currentCategoryId) {
        return candidate;
      }

      suffix += 1;
      candidate = `${baseSlug}-${suffix}`;

      if (suffix > 100) {
        throw new ConflictException('Unable to generate a unique category slug');
      }
    }
  }

  private toCategoryResponse(category: CategoryWithRelations): CategoryResponseDto {
    return {
      id: category.id,
      parentId: category.parentId,
      name: category.name,
      slug: category.slug,
      description: category.description,
      level: category.level,
      sortOrder: category.sortOrder,
      isActive: category.isActive,
      metadata: category.metadata,
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString(),
      parent: category.parent
        ? {
            id: category.parent.id,
            name: category.parent.name,
            slug: category.parent.slug
          }
        : null,
      iconMedia: category.iconMedia
        ? {
            id: category.iconMedia.id,
            publicUrl: category.iconMedia.publicUrl,
            altText: category.iconMedia.altText
          }
        : null,
      imageMedia: category.imageMedia
        ? {
            id: category.imageMedia.id,
            publicUrl: category.imageMedia.publicUrl,
            altText: category.imageMedia.altText
          }
        : null
    };
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
