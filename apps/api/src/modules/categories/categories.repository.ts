import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import type { CategoryFilterDto } from './dto/category-filter.dto';

const categoryInclude = {
  parent: {
    select: {
      id: true,
      name: true,
      slug: true
    }
  },
  iconMedia: {
    select: {
      id: true,
      publicUrl: true,
      altText: true
    }
  },
  imageMedia: {
    select: {
      id: true,
      publicUrl: true,
      altText: true
    }
  }
} satisfies Prisma.CategoryInclude;

@Injectable()
export class CategoriesRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  list(filters: CategoryFilterDto, skip: number, take: number, publicOnly = false) {
    const where = this.buildWhere(filters, publicOnly);

    return this.prisma.$transaction([
      this.prisma.category.count({ where }),
      this.prisma.category.findMany({
        where,
        skip,
        take,
        include: categoryInclude,
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }]
      })
    ]);
  }

  findById(id: string, publicOnly = false) {
    return this.prisma.category.findFirst({
      where: {
        id,
        isActive: publicOnly ? true : undefined
      },
      include: categoryInclude
    });
  }

  findBySlugWithinParent(slug: string, parentId?: string | null) {
    return this.prisma.category.findFirst({
      where: {
        slug,
        parentId: parentId ?? null
      },
      select: {
        id: true
      }
    });
  }

  create(data: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({
      data,
      include: categoryInclude
    });
  }

  update(id: string, data: Prisma.CategoryUpdateInput) {
    return this.prisma.category.update({
      where: { id },
      data,
      include: categoryInclude
    });
  }

  private buildWhere(
    filters: CategoryFilterDto,
    publicOnly: boolean
  ): Prisma.CategoryWhereInput {
    return {
      parentId: filters.parentId,
      isActive: publicOnly ? true : filters.isActive,
      OR: filters.search
        ? [
            { name: { contains: filters.search, mode: 'insensitive' } },
            { slug: { contains: filters.search, mode: 'insensitive' } },
            { description: { contains: filters.search, mode: 'insensitive' } }
          ]
        : undefined
    };
  }
}

export type CategoryWithRelations = NonNullable<
  Awaited<ReturnType<CategoriesRepository['findById']>>
>;
