import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryMediaResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  publicUrl?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  altText?: string | null;
}

export class CategoryParentResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  slug!: string;
}

export class CategoryResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  parentId?: string | null;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  slug!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  description?: string | null;

  @ApiProperty({ type: Number })
  level!: number;

  @ApiProperty({ type: Number })
  sortOrder!: number;

  @ApiProperty({ type: Boolean })
  isActive!: boolean;

  @ApiPropertyOptional({ type: Object, additionalProperties: true })
  metadata!: unknown;

  @ApiProperty({ type: String })
  createdAt!: string;

  @ApiProperty({ type: String })
  updatedAt!: string;

  @ApiPropertyOptional({ type: () => CategoryParentResponseDto, nullable: true })
  parent?: CategoryParentResponseDto | null;

  @ApiPropertyOptional({ type: () => CategoryMediaResponseDto, nullable: true })
  iconMedia?: CategoryMediaResponseDto | null;

  @ApiPropertyOptional({ type: () => CategoryMediaResponseDto, nullable: true })
  imageMedia?: CategoryMediaResponseDto | null;
}

export class CategoryEnvelopeResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({ type: () => CategoryResponseDto })
  data!: CategoryResponseDto;
}

export class CategoryListResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({ type: () => [CategoryResponseDto] })
  data!: CategoryResponseDto[];
}
