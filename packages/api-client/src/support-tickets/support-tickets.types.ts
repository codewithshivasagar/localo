import type { ApiRecord } from '../types/api-response';
import type { PaginationQuery } from '../types/pagination';

export interface SupportTicketUserSummary {
  id: string;
  fullName: string;
  email: string;
}

export interface SupportTicketShopSummary {
  id: string;
  name: string;
  slug: string;
}

export interface SupportAttachmentResponse {
  id: string;
  mediaId: string;
  publicUrl?: string | null;
  altText?: string | null;
}

export interface SupportMessageResponse {
  id: string;
  body: string;
  isInternalNote: boolean;
  sender: SupportTicketUserSummary;
  attachments: SupportAttachmentResponse[];
  createdAt: string;
}

export interface SupportTicketResponse {
  id: string;
  ticketNumber: string;
  category: string;
  priority: string;
  status: string;
  subject: string;
  description: string;
  createdBy: SupportTicketUserSummary;
  assignedTo?: SupportTicketUserSummary | null;
  shop?: SupportTicketShopSummary | null;
  messages: SupportMessageResponse[];
  resolvedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SupportTicketFilterQuery extends PaginationQuery {
  status?: string;
  priority?: string;
  category?: string;
  type?: string;
  shopId?: string;
  userId?: string;
  search?: string;
}

export type CreateSupportTicketRequest = ApiRecord & {
  category: string;
  priority: string;
  subject: string;
  description: string;
};

export interface CreateSupportTicketMessageRequest {
  body: string;
}

export interface UpdateSupportTicketStatusRequest {
  status: string;
}
