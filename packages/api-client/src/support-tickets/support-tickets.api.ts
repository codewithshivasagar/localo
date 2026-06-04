import { apiClient, type HttpClient } from '../http/http-client';
import type { PaginatedResult } from '../types/pagination';
import type {
  CreateSupportTicketMessageRequest,
  CreateSupportTicketRequest,
  SupportTicketFilterQuery,
  SupportTicketResponse,
  UpdateSupportTicketStatusRequest
} from './support-tickets.types';

export function createSupportTicketsApi(client: HttpClient = apiClient) {
  return {
    create(body: CreateSupportTicketRequest): Promise<SupportTicketResponse> {
      return client.post<SupportTicketResponse, CreateSupportTicketRequest>('/support-tickets', body);
    },

    my(filters?: SupportTicketFilterQuery): Promise<PaginatedResult<SupportTicketResponse>> {
      return client.getPaginated<SupportTicketResponse>('/support-tickets/my', filters);
    },

    get(id: string): Promise<SupportTicketResponse> {
      return client.get<SupportTicketResponse>(`/support-tickets/${id}`);
    },

    addMessage(id: string, body: CreateSupportTicketMessageRequest): Promise<SupportTicketResponse> {
      return client.post<SupportTicketResponse, CreateSupportTicketMessageRequest>(
        `/support-tickets/${id}/messages`,
        body
      );
    },

    adminList(filters?: SupportTicketFilterQuery): Promise<PaginatedResult<SupportTicketResponse>> {
      return client.getPaginated<SupportTicketResponse>('/admin/support-tickets', filters);
    },

    adminGet(id: string): Promise<SupportTicketResponse> {
      return client.get<SupportTicketResponse>(`/admin/support-tickets/${id}`);
    },

    adminUpdateStatus(
      id: string,
      body: UpdateSupportTicketStatusRequest
    ): Promise<SupportTicketResponse> {
      return client.patch<SupportTicketResponse, UpdateSupportTicketStatusRequest>(
        `/admin/support-tickets/${id}/status`,
        body
      );
    }
  };
}

export const supportTicketsApi = createSupportTicketsApi();
