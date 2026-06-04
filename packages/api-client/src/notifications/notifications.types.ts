import type { PaginationQuery } from '../types/pagination';

export interface NotificationResponse {
  id: string;
  channel: string;
  title?: string | null;
  body: string;
  data: unknown;
  status: string;
  isRead: boolean;
  readAt?: string | null;
  sentAt?: string | null;
  createdAt: string;
}

export interface NotificationFilterQuery extends PaginationQuery {
  isRead?: boolean;
  type?: string;
}
