import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SupportTicketPriority, SupportTicketStatus } from '@prisma/client';

export class SupportTicketUserSummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  fullName!: string;

  @ApiProperty()
  email!: string;
}

export class SupportTicketShopSummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;
}

export class SupportAttachmentResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  mediaId!: string;

  @ApiPropertyOptional()
  publicUrl?: string | null;

  @ApiPropertyOptional()
  altText?: string | null;
}

export class SupportMessageResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  body!: string;

  @ApiProperty()
  isInternalNote!: boolean;

  @ApiProperty({ type: SupportTicketUserSummaryDto })
  sender!: SupportTicketUserSummaryDto;

  @ApiProperty({ type: [SupportAttachmentResponseDto] })
  attachments!: SupportAttachmentResponseDto[];

  @ApiProperty()
  createdAt!: string;
}

export class SupportTicketResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  ticketNumber!: string;

  @ApiProperty()
  category!: string;

  @ApiProperty({ enum: SupportTicketPriority })
  priority!: SupportTicketPriority;

  @ApiProperty({ enum: SupportTicketStatus })
  status!: SupportTicketStatus;

  @ApiProperty()
  subject!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty({ type: SupportTicketUserSummaryDto })
  createdBy!: SupportTicketUserSummaryDto;

  @ApiPropertyOptional({ type: SupportTicketUserSummaryDto })
  assignedTo?: SupportTicketUserSummaryDto | null;

  @ApiPropertyOptional({ type: SupportTicketShopSummaryDto })
  shop?: SupportTicketShopSummaryDto | null;

  @ApiProperty({ type: [SupportMessageResponseDto] })
  messages!: SupportMessageResponseDto[];

  @ApiPropertyOptional()
  resolvedAt?: string | null;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}

export class SupportTicketEnvelopeResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: SupportTicketResponseDto })
  data!: SupportTicketResponseDto;
}

export class SupportTicketListResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: [SupportTicketResponseDto] })
  data!: SupportTicketResponseDto[];
}

