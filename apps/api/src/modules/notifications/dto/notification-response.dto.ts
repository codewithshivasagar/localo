import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationChannel, NotificationStatus } from '@prisma/client';

export class NotificationResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({ enum: NotificationChannel })
  channel!: NotificationChannel;

  @ApiPropertyOptional()
  title?: string | null;

  @ApiProperty()
  body!: string;

  @ApiProperty()
  data!: unknown;

  @ApiProperty({ enum: NotificationStatus })
  status!: NotificationStatus;

  @ApiProperty()
  isRead!: boolean;

  @ApiPropertyOptional()
  readAt?: string | null;

  @ApiPropertyOptional()
  sentAt?: string | null;

  @ApiProperty()
  createdAt!: string;
}

export class NotificationEnvelopeResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: NotificationResponseDto })
  data!: NotificationResponseDto;
}

export class NotificationListResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: [NotificationResponseDto] })
  data!: NotificationResponseDto[];
}

