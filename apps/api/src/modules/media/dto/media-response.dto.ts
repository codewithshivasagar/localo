import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export type MediaAssetType = 'image' | 'svg' | 'document' | 'other';

export class MediaResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  filename!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  title?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  altText?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  publicUrl?: string | null;

  @ApiProperty({ type: String })
  mimeType!: string;

  @ApiPropertyOptional({ type: Number, nullable: true })
  sizeBytes?: number | null;

  @ApiProperty({ type: [String] })
  tags!: string[];

  @ApiProperty({ enum: ['image', 'svg', 'document', 'other'] })
  type!: MediaAssetType;

  @ApiProperty({ type: String })
  createdAt!: string;
}

export class MediaListResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({ type: () => [MediaResponseDto] })
  data!: MediaResponseDto[];

  @ApiProperty({
    type: Object,
    additionalProperties: true
  })
  meta!: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class MediaEnvelopeResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({ type: () => MediaResponseDto })
  data!: MediaResponseDto;
}

export class MediaDeleteResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({
    type: Object,
    additionalProperties: true
  })
  data!: {
    id: string;
  };
}
