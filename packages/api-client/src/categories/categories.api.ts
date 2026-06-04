import { apiClient, type HttpClient } from '../http/http-client';
import type { PaginatedResult } from '../types/pagination';
import type {
  CategoryFilterQuery,
  CategoryResponse,
  CreateCategoryRequest,
  UpdateCategoryRequest
} from './categories.types';

export function createCategoriesApi(client: HttpClient = apiClient) {
  return {
    list(filters?: CategoryFilterQuery): Promise<PaginatedResult<CategoryResponse>> {
      return client.getPaginated<CategoryResponse>('/categories', filters);
    },

    get(id: string): Promise<CategoryResponse> {
      return client.get<CategoryResponse>(`/categories/${id}`);
    },

    adminCreate(body: CreateCategoryRequest): Promise<CategoryResponse> {
      return client.post<CategoryResponse, CreateCategoryRequest>('/admin/categories', body);
    },

    adminUpdate(id: string, body: UpdateCategoryRequest): Promise<CategoryResponse> {
      return client.patch<CategoryResponse, UpdateCategoryRequest>(`/admin/categories/${id}`, body);
    },

    adminDelete(id: string): Promise<CategoryResponse> {
      return client.delete<CategoryResponse>(`/admin/categories/${id}`);
    }
  };
}

export const categoriesApi = createCategoriesApi();
