import { apiClient, type HttpClient } from '../http/http-client';
import type { PaginatedResult } from '../types/pagination';
import type { NotificationFilterQuery, NotificationResponse } from './notifications.types';

export function createNotificationsApi(client: HttpClient = apiClient) {
  return {
    list(filters?: NotificationFilterQuery): Promise<PaginatedResult<NotificationResponse>> {
      return client.getPaginated<NotificationResponse>('/notifications', filters);
    },

    markRead(id: string): Promise<NotificationResponse> {
      return client.patch<NotificationResponse>(`/notifications/${id}/read`);
    },

    markAllRead(): Promise<{ count?: number } | NotificationResponse[]> {
      return client.patch<{ count?: number } | NotificationResponse[]>('/notifications/read-all');
    }
  };
}

export const notificationsApi = createNotificationsApi();
