import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SupportTicketPriority, SupportTicketStatus } from '@prisma/client';

export class SupportTicketUserSummaryDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  fullName!: string;

  @ApiProperty({ type: String })
  email!: string;
}

export class SupportTicketShopSummaryDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  slug!: string;
}

export class SupportAttachmentResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  mediaId!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  publicUrl?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  altText?: string | null;
}

export class SupportMessageResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  body!: string;

  @ApiProperty({ type: Boolean })
  isInternalNote!: boolean;

  @ApiProperty({ type: () => SupportTicketUserSummaryDto })
  sender!: SupportTicketUserSummaryDto;

  @ApiProperty({ type: () => [SupportAttachmentResponseDto] })
  attachments!: SupportAttachmentResponseDto[];

  @ApiProperty({ type: String })
  createdAt!: string;
}

export class SupportTicketResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  ticketNumber!: string;

  @ApiProperty({ type: String })
  category!: string;

  @ApiProperty({ enum: SupportTicketPriority })
  priority!: SupportTicketPriority;

  @ApiProperty({ enum: SupportTicketStatus })
  status!: SupportTicketStatus;

  @ApiProperty({ type: String })
  subject!: string;

  @ApiProperty({ type: String })
  description!: string;

  @ApiProperty({ type: () => SupportTicketUserSummaryDto })
  createdBy!: SupportTicketUserSummaryDto;

  @ApiPropertyOptional({ type: () => SupportTicketUserSummaryDto, nullable: true })
  assignedTo?: SupportTicketUserSummaryDto | null;

  @ApiPropertyOptional({ type: () => SupportTicketShopSummaryDto, nullable: true })
  shop?: SupportTicketShopSummaryDto | null;

  @ApiProperty({ type: () => [SupportMessageResponseDto] })
  messages!: SupportMessageResponseDto[];

  @ApiPropertyOptional({ type: String, nullable: true })
  resolvedAt?: string | null;

  @ApiProperty({ type: String })
  createdAt!: string;

  @ApiProperty({ type: String })
  updatedAt!: string;
}

export class SupportTicketEnvelopeResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({ type: () => SupportTicketResponseDto })
  data!: SupportTicketResponseDto;
}

export class SupportTicketListResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String })
  message!: string;

  @ApiProperty({ type: () => [SupportTicketResponseDto] })
  data!: SupportTicketResponseDto[];
}
