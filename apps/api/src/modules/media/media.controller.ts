import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  ParseUUIDPipe,
  Param,
  Patch,
  Post,
  Query,
  Req
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { Readable } from 'node:stream';
import { Role } from '@localo/shared-types';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import type { AuthenticatedUser } from '../../common/types/authenticated-user.type';
import { MediaFilterDto } from './dto/media-filter.dto';
import {
  MediaDeleteResponseDto,
  MediaEnvelopeResponseDto,
  MediaListResponseDto
} from './dto/media-response.dto';
import { MediaUploadDto, MediaUpdateDto } from './dto/media-request.dto';
import { MediaService } from './media.service';
import {
  MEDIA_ALLOWED_MIME_TYPES,
  MEDIA_MAX_UPLOAD_SIZE_BYTES
} from './media.constants';

function toFormValue(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);

  if (typeof value === 'string') {
    const normalized = value.trim();
    return normalized ? normalized : undefined;
  }

  return undefined;
}

function toRequestHeaders(request: ExpressRequest): Headers {
  const headers = new Headers();

  for (const [key, value] of Object.entries(request.headers)) {
    if (Array.isArray(value)) {
      value.forEach((item) => headers.append(key, item));
      continue;
    }

    if (typeof value === 'string') {
      headers.set(key, value);
    }
  }

  return headers;
}

@ApiTags('admin-media')
@ApiBearerAuth()
@Controller('admin/media')
export class MediaController {
  constructor(@Inject(MediaService) private readonly mediaService: MediaService) {}

  @Get()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'List media assets for admin' })
  @ApiOkResponse({ type: MediaListResponseDto })
  list(@Query() filters: MediaFilterDto) {
    return this.mediaService.list(filters);
  }

  @Post('upload')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Upload a new media asset' })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: MediaEnvelopeResponseDto })
  async upload(@Req() request: ExpressRequest, @CurrentUser() user: AuthenticatedUser) {
    let formData: FormData;

    try {
      formData = await new Request(
        'http://localhost',
        {
          body: Readable.toWeb(request) as unknown as BodyInit,
          duplex: 'half',
          headers: toRequestHeaders(request),
          method: request.method
        } as any
      ).formData();
    } catch {
      throw new BadRequestException('Invalid media upload payload');
    }

    const file = formData.get('file');

    if (!(file instanceof File)) {
      throw new BadRequestException('A media file is required');
    }

    if (!MEDIA_ALLOWED_MIME_TYPES.has(file.type || '')) {
      throw new BadRequestException('Unsupported media type');
    }

    if (file.size > MEDIA_MAX_UPLOAD_SIZE_BYTES) {
      throw new BadRequestException('Media file is too large');
    }

    const payload = {
      originalname: file.name,
      mimetype: file.type || 'application/octet-stream',
      size: file.size,
      buffer: Buffer.from(await file.arrayBuffer())
    };

    const body: MediaUploadDto = {
      altText: toFormValue(formData, 'altText'),
      tags: toFormValue(formData, 'tags'),
      title: toFormValue(formData, 'title')
    };

    const publicBaseUrl = `${request.protocol}://${request.get('host') ?? 'localhost:3000'}`;
    return this.mediaService.upload(payload, body, user, publicBaseUrl);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get a media asset by id' })
  @ApiOkResponse({ type: MediaEnvelopeResponseDto })
  getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.mediaService.find(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update a media asset' })
  @ApiOkResponse({ type: MediaEnvelopeResponseDto })
  update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() dto: MediaUpdateDto) {
    return this.mediaService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Delete a media asset' })
  @ApiOkResponse({ type: MediaDeleteResponseDto })
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.mediaService.delete(id);
  }
}
