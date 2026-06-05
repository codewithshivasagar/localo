import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class MediaUploadDto {
  @ApiPropertyOptional({ type: String, description: 'Optional display title' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @ApiPropertyOptional({ type: String, description: 'Optional alt text' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  altText?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Comma-separated tags such as category-image'
  })
  @IsOptional()
  @IsString()
  tags?: string;
}

export class MediaUpdateDto {
  @ApiPropertyOptional({ type: String, description: 'Optional display title' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @ApiPropertyOptional({ type: String, description: 'Optional alt text' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  altText?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Comma-separated tags such as category-image'
  })
  @IsOptional()
  @IsString()
  tags?: string;
}
