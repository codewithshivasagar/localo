import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSupportTicketMessageDto {
  @ApiProperty()
  @IsString()
  body!: string;

  @ApiPropertyOptional({
    description: 'Admin-only internal note flag. Ignored for non-admin users.'
  })
  @IsOptional()
  @IsBoolean()
  isInternalNote?: boolean;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsUUID(undefined, { each: true })
  attachmentMediaIds?: string[];
}

