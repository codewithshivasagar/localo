import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min
} from 'class-validator';
import { parseBooleanQueryParam } from '../../../common/transformers/query-param.transformers';
import {
  DEFAULT_CATEGORY_LIST_LIMIT,
  DEFAULT_CATEGORY_LIST_PAGE,
  MAX_CATEGORY_LIST_LIMIT
} from '../categories.constants';

export class CategoryFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  parentId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => parseBooleanQueryParam(value))
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ default: DEFAULT_CATEGORY_LIST_PAGE })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = DEFAULT_CATEGORY_LIST_PAGE;

  @ApiPropertyOptional({ default: DEFAULT_CATEGORY_LIST_LIMIT })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(MAX_CATEGORY_LIST_LIMIT)
  limit: number = DEFAULT_CATEGORY_LIST_LIMIT;
}
