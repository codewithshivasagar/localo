import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import {
  MEDIA_DEFAULT_LIST_LIMIT,
  MEDIA_DEFAULT_LIST_PAGE,
  MEDIA_MAX_LIST_LIMIT
} from '../media.constants';

export type MediaTypeFilter = 'all' | 'images' | 'svgs' | 'documents';

export class MediaFilterDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: ['all', 'images', 'svgs', 'documents'], default: 'all' })
  @IsOptional()
  @IsIn(['all', 'images', 'svgs', 'documents'])
  type?: MediaTypeFilter = 'all';

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  tag?: string;

  @ApiPropertyOptional({ default: MEDIA_DEFAULT_LIST_PAGE })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = MEDIA_DEFAULT_LIST_PAGE;

  @ApiPropertyOptional({ default: MEDIA_DEFAULT_LIST_LIMIT })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(MEDIA_MAX_LIST_LIMIT)
  limit: number = MEDIA_DEFAULT_LIST_LIMIT;
}
