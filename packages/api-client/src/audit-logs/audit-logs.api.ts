import { apiClient, type HttpClient } from '../http/http-client';
import type { PaginatedResult } from '../types/pagination';
import type { AuditLogFilterQuery, AuditLogResponse } from './audit-logs.types';

export function createAuditLogsApi(client: HttpClient = apiClient) {
  return {
    adminList(filters?: AuditLogFilterQuery): Promise<PaginatedResult<AuditLogResponse>> {
      return client.getPaginated<AuditLogResponse>('/admin/audit-logs', filters);
    },

    adminGet(id: string): Promise<AuditLogResponse> {
      return client.get<AuditLogResponse>(`/admin/audit-logs/${id}`);
    }
  };
}

export const auditLogsApi = createAuditLogsApi();
