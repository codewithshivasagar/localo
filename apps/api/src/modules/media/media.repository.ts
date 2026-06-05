import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import type { MediaFilterDto, MediaTypeFilter } from './dto/media-filter.dto';

const mediaSelect = {
  id: true,
  path: true,
  publicUrl: true,
  mimeType: true,
  sizeBytes: true,
  altText: true,
  metadata: true,
  createdAt: true
} satisfies Prisma.MediaAssetSelect;

@Injectable()
export class MediaRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  list(filters: MediaFilterDto, skip: number, take: number) {
    const where = this.buildWhere(filters);

    return this.prisma.$transaction([
      this.prisma.mediaAsset.count({ where }),
      this.prisma.mediaAsset.findMany({
        where,
        skip,
        take,
        orderBy: {
          createdAt: 'desc'
        },
        select: mediaSelect
      })
    ]);
  }

  findById(id: string) {
    return this.prisma.mediaAsset.findFirst({
      where: { id },
      select: mediaSelect
    });
  }

  create(data: Prisma.MediaAssetCreateInput) {
    return this.prisma.mediaAsset.create({
      data,
      select: mediaSelect
    });
  }

  update(id: string, data: Prisma.MediaAssetUpdateInput) {
    return this.prisma.mediaAsset.update({
      where: { id },
      data,
      select: mediaSelect
    });
  }

  delete(id: string) {
    return this.prisma.mediaAsset.delete({
      where: { id }
    });
  }

  private buildWhere(filters: MediaFilterDto): Prisma.MediaAssetWhereInput {
    const where: Prisma.MediaAssetWhereInput[] = [];
    const mimeWhere = this.buildMimeWhere(filters.type);
    const search = filters.search?.trim();
    const tag = filters.tag?.trim().toLowerCase();

    if (Object.keys(mimeWhere).length > 0) {
      where.push(mimeWhere);
    }

    if (tag) {
      where.push({
        metadata: {
          path: ['tags'],
          array_contains: [tag]
        }
      });
    }

    if (search) {
      where.push({
        OR: [
          {
            path: { contains: search, mode: 'insensitive' }
          },
          {
            altText: { contains: search, mode: 'insensitive' }
          },
          {
            publicUrl: { contains: search, mode: 'insensitive' }
          },
          {
            metadata: {
              path: ['title'],
              string_contains: search,
              mode: 'insensitive'
            }
          }
        ]
      });
    }

    if (where.length === 0) {
      return {};
    }

    return {
      AND: where
    };
  }

  private buildMimeWhere(type?: MediaTypeFilter): Prisma.MediaAssetWhereInput {
    switch (type) {
      case 'images':
        return {
          mimeType: {
            startsWith: 'image/',
            not: 'image/svg+xml'
          }
        };
      case 'svgs':
        return {
          mimeType: 'image/svg+xml'
        };
      case 'documents':
        return {
          OR: [
            { mimeType: 'application/pdf' },
            { mimeType: 'application/msword' },
            {
              mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            },
            { mimeType: 'text/plain' }
          ]
        };
      default:
        return {};
    }
  }
}

export type MediaRecord = NonNullable<Awaited<ReturnType<MediaRepository['findById']>>>;
