import { apiClient, type HttpClient } from '../http/http-client';
import type { PaginatedResult } from '../types/pagination';
import type {
  MediaFilterQuery,
  MediaResponse,
  UpdateMediaRequest
} from './media.types';

export function createMediaApi(client: HttpClient = apiClient) {
  return {
    list(filters?: MediaFilterQuery): Promise<PaginatedResult<MediaResponse>> {
      return client.getPaginated<MediaResponse>('/admin/media', filters);
    },

    upload(body: FormData): Promise<MediaResponse> {
      return client.post<MediaResponse, FormData>('/admin/media/upload', body);
    },

    get(id: string): Promise<MediaResponse> {
      return client.get<MediaResponse>(`/admin/media/${id}`);
    },

    update(id: string, body: UpdateMediaRequest): Promise<MediaResponse> {
      return client.patch<MediaResponse, UpdateMediaRequest>(`/admin/media/${id}`, body);
    },

    delete(id: string): Promise<{ id: string }> {
      return client.delete<{ id: string }>(`/admin/media/${id}`);
    }
  };
}

export const mediaApi = createMediaApi();
