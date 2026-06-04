import type { PaginationQuery } from '../types/pagination';

export interface AuditLogActorResponse {
  id: string;
  fullName: string;
  email: string;
}

export interface AuditLogResponse {
  id: string;
  actorUserId?: string | null;
  actorUser?: AuditLogActorResponse | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  oldValues?: unknown;
  newValues?: unknown;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: string;
}

export interface AuditLogFilterQuery extends PaginationQuery {
  actorUserId?: string;
  entityType?: string;
  entityId?: string;
  action?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}
