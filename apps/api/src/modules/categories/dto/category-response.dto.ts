import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryMediaResponseDto {
  @ApiProperty()
  id!: string;

  @ApiPropertyOptional()
  publicUrl?: string | null;

  @ApiPropertyOptional()
  altText?: string | null;
}

export class CategoryParentResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;
}

export class CategoryResponseDto {
  @ApiProperty()
  id!: string;

  @ApiPropertyOptional()
  parentId?: string | null;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;

  @ApiPropertyOptional()
  description?: string | null;

  @ApiProperty()
  level!: number;

  @ApiProperty()
  sortOrder!: number;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty()
  metadata!: unknown;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;

  @ApiPropertyOptional({ type: CategoryParentResponseDto })
  parent?: CategoryParentResponseDto | null;

  @ApiPropertyOptional({ type: CategoryMediaResponseDto })
  iconMedia?: CategoryMediaResponseDto | null;

  @ApiPropertyOptional({ type: CategoryMediaResponseDto })
  imageMedia?: CategoryMediaResponseDto | null;
}

export class CategoryEnvelopeResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: CategoryResponseDto })
  data!: CategoryResponseDto;
}

export class CategoryListResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: [CategoryResponseDto] })
  data!: CategoryResponseDto[];
}
