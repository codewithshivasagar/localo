import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SupportTicketPriority } from '@prisma/client';
import { IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateSupportTicketDto {
  @ApiProperty({ maxLength: 60 })
  @IsString()
  @MaxLength(60)
  category!: string;

  @ApiPropertyOptional({ enum: SupportTicketPriority })
  @IsOptional()
  @IsEnum(SupportTicketPriority)
  priority?: SupportTicketPriority;

  @ApiProperty({ maxLength: 220 })
  @IsString()
  @MaxLength(220)
  subject!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  shopId?: string;
}

