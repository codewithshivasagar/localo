import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationChannel, NotificationStatus } from '@prisma/client';

export class NotificationResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ enum: NotificationChannel })
  channel!: NotificationChannel;

  @ApiPropertyOptional({ type: String, nullable: true })
  title?: string | null;

  @ApiProperty({ type: String })
  body!: string;

  @ApiPropertyOptional({ type: Object, additionalProperties: true })
  data!: unknown;

  @ApiProperty({ enum: NotificationStatus })
  status!: NotificationStatus;

  @ApiProperty({ type: Boolean })
  isRead!: boolean;

  @ApiPropertyOptional({ type: String, nullable: true })
  readAt?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  sentAt?: string | null;

  @ApiProperty({ type: String })
  createdAt!: string;
}

export class NotificationEnvelopeResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({ type: () => NotificationResponseDto })
  data!: NotificationResponseDto;
}

export class NotificationListResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({ type: () => [NotificationResponseDto] })
  data!: NotificationResponseDto[];
}
