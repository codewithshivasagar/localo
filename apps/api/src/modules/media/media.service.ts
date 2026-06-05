import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { extname, join, basename, normalize } from 'node:path';
import { normalizePagination } from '../../common/pagination/pagination';
import type { PaginationResponse } from '../../common/responses/pagination-response.type';
import type { AuthenticatedUser } from '../../common/types/authenticated-user.type';
import { MediaRepository, type MediaRecord } from './media.repository';
import { MEDIA_UPLOAD_PUBLIC_PREFIX } from './media.constants';
import type { MediaFilterDto } from './dto/media-filter.dto';
import type { MediaResponseDto } from './dto/media-response.dto';
import type { MediaUpdateDto, MediaUploadDto } from './dto/media-request.dto';

interface UploadedMediaFile {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
  size: number;
}

const MEDIA_DIR = join(process.cwd(), 'public', 'media');

const MIME_TYPE_TO_MEDIA_TYPE = {
  'image/svg+xml': 'svg'
} as const;

type MediaType = 'image' | 'svg' | 'document' | 'other';

@Injectable()
export class MediaService {
  constructor(@Inject(MediaRepository) private readonly mediaRepository: MediaRepository) {}

  async list(filters: MediaFilterDto): Promise<PaginationResponse<MediaResponseDto>> {
    const { page, limit, skip } = normalizePagination(filters.page, filters.limit, {
      defaultPage: 1,
      defaultLimit: 24,
      maxLimit: 100
    });

    const [total, media] = await this.mediaRepository.list(filters, skip, limit);

    return {
      success: true,
      message: 'Media fetched successfully',
      data: media.map((item) => this.toMediaResponse(item)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit))
      }
    };
  }

  async find(id: string): Promise<MediaResponseDto> {
    const media = await this.mediaRepository.findById(id);

    if (!media) {
      throw new NotFoundException('Media not found');
    }

    return this.toMediaResponse(media);
  }

  async upload(
    file: UploadedMediaFile | undefined,
    dto: MediaUploadDto,
    actor?: AuthenticatedUser,
    publicBaseUrl?: string
  ): Promise<MediaResponseDto> {
    if (!file) {
      throw new BadRequestException('A media file is required');
    }

    this.ensureMediaDirectory();

    const mediaType = this.resolveMediaType(file.mimetype);

    if (mediaType === 'other') {
      throw new BadRequestException('Unsupported media type');
    }

    const filename = this.buildFilename(file.originalname, file.mimetype);
    const relativePath = normalize(`media/${filename}`).replace(/^\/+/, '');
    const absoluteFilePath = join(MEDIA_DIR, filename);
    writeFileSync(absoluteFilePath, file.buffer);

    const metadata = this.mergeMetadata(null, {
      title: this.normalizeText(dto.title),
      tags: this.normalizeTags(dto.tags),
      originalName: file.originalname
    });
    const absolutePublicUrl = this.resolvePublicUrl(publicBaseUrl, relativePath);
    const sizeBytes = file.size > 0 ? BigInt(file.size) : null;

    try {
      const created = await this.mediaRepository.create({
        ownerUser: actor?.id ? { connect: { id: actor.id } } : undefined,
        storageProvider: 'local',
        bucket: null,
        path: relativePath,
        publicUrl: absolutePublicUrl,
        mimeType: file.mimetype,
        sizeBytes: sizeBytes ?? undefined,
        altText: this.normalizeText(dto.altText),
        metadata: metadata as Prisma.InputJsonValue
      });

      return this.toMediaResponse(created);
    } catch (error) {
      this.removeLocalFile(relativePath);
      throw error;
    }
  }

  async update(id: string, dto: MediaUpdateDto): Promise<MediaResponseDto> {
    const existingMedia = await this.mediaRepository.findById(id);

    if (!existingMedia) {
      throw new NotFoundException('Media not found');
    }

    const currentMetadata = this.extractMetadata(existingMedia.metadata);
    const nextMetadata = this.mergeMetadata(currentMetadata, {
      title: dto.title === undefined ? currentMetadata.title : this.normalizeText(dto.title),
      tags:
        dto.tags === undefined ? currentMetadata.tags : this.normalizeTags(dto.tags)
    });

    const updated = await this.mediaRepository.update(id, {
      altText:
        dto.altText === undefined ? undefined : this.normalizeText(dto.altText),
      metadata: nextMetadata as Prisma.InputJsonValue
    });

    return this.toMediaResponse(updated);
  }

  async delete(id: string): Promise<{ id: string }> {
    const existingMedia = await this.mediaRepository.findById(id);

    if (!existingMedia) {
      throw new NotFoundException('Media not found');
    }

    try {
      await this.mediaRepository.delete(id);
      this.removeLocalFile(existingMedia.path);
    } catch (error) {
      const prismaError = error as { code?: string };

      if (prismaError.code === 'P2003') {
        throw new BadRequestException('This media is still referenced and cannot be deleted yet');
      }

      throw error;
    }

    return { id };
  }

  private ensureMediaDirectory() {
    if (!existsSync(MEDIA_DIR)) {
      mkdirSync(MEDIA_DIR, { recursive: true });
    }
  }

  private buildFilename(originalName: string, mimeType: string) {
    const extension = this.resolveExtension(originalName, mimeType);
    const baseName = basename(originalName, extname(originalName))
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const safeBaseName = baseName || 'media';
    const unique = randomUUID();
    return `${unique}-${safeBaseName}${extension}`;
  }

  private removeLocalFile(filePath: string) {
    const absolutePath = join(process.cwd(), 'public', filePath);

    if (!existsSync(absolutePath)) {
      return;
    }

    try {
      unlinkSync(absolutePath);
    } catch {
      // Keep delete non-disruptive if filesystem cleanup fails.
    }
  }

  private resolvePublicUrl(publicBaseUrl: string | undefined, relativePath: string) {
    const baseUrl = publicBaseUrl?.replace(/\/$/, '');

    if (!baseUrl) {
      return `/${MEDIA_UPLOAD_PUBLIC_PREFIX.replace(/^\//, '')}/${basename(relativePath)}`;
    }

    return `${baseUrl}${MEDIA_UPLOAD_PUBLIC_PREFIX}/${basename(relativePath)}`;
  }

  private resolveExtension(originalName: string, mimeType: string) {
    const extension = extname(originalName).toLowerCase();

    if (extension) {
      return extension;
    }

    if (mimeType === 'image/svg+xml') {
      return '.svg';
    }

    if (mimeType === 'image/png') {
      return '.png';
    }

    if (mimeType === 'image/jpeg') {
      return '.jpg';
    }

    if (mimeType === 'image/webp') {
      return '.webp';
    }

    if (mimeType === 'image/gif') {
      return '.gif';
    }

    if (mimeType === 'application/pdf') {
      return '.pdf';
    }

    if (mimeType === 'application/msword') {
      return '.doc';
    }

    if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return '.docx';
    }

    return '';
  }

  private resolveMediaType(mimeType: string): MediaType {
    if (mimeType === 'image/svg+xml') {
      return MIME_TYPE_TO_MEDIA_TYPE[mimeType];
    }

    if (mimeType.startsWith('image/')) {
      return 'image';
    }

    if (
      mimeType === 'application/pdf' ||
      mimeType === 'application/msword' ||
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimeType === 'text/plain'
    ) {
      return 'document';
    }

    return 'other';
  }

  private normalizeText(value?: string | null): string | null {
    const normalized = value?.trim();
    return normalized ? normalized : null;
  }

  private normalizeTags(value?: string | null): string[] {
    if (!value) {
      return [];
    }

    return Array.from(
      new Set(
        value
          .split(',')
          .map((tag) => tag.trim().toLowerCase())
          .filter(Boolean)
      )
    );
  }

  private extractMetadata(metadata: unknown) {
    if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
      return { tags: [] as string[], title: null as string | null };
    }

    const record = metadata as Record<string, unknown>;
    const tags = Array.isArray(record.tags)
      ? record.tags.filter((tag): tag is string => typeof tag === 'string').map((tag) => tag.trim().toLowerCase()).filter(Boolean)
      : [];
    const title = typeof record.title === 'string' && record.title.trim() ? record.title.trim() : null;

    return { tags, title };
  }

  private mergeMetadata(
    current: { tags: string[]; title: string | null } | null,
    next: { tags?: string[]; title?: string | null; originalName?: string }
  ) {
    return {
      ...(current ? { ...current } : {}),
      ...(next.title !== undefined ? { title: next.title } : {}),
      ...(next.tags !== undefined ? { tags: next.tags } : {}),
      ...(next.originalName ? { originalName: next.originalName } : {})
    };
  }

  private toMediaResponse(media: MediaRecord): MediaResponseDto {
    const metadata = this.extractMetadata(media.metadata);
    const type = this.resolveMediaType(media.mimeType);

    return {
      id: media.id,
      filename: basename(media.path),
      title: metadata.title,
      altText: media.altText ?? null,
      publicUrl: media.publicUrl ?? null,
      mimeType: media.mimeType,
      sizeBytes: media.sizeBytes == null ? null : Number(media.sizeBytes),
      tags: metadata.tags,
      type,
      createdAt: media.createdAt.toISOString()
    };
  }
}
