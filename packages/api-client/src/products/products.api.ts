import { apiClient, type HttpClient } from '../http/http-client';
import type { PaginatedResult } from '../types/pagination';
import type {
  CreateProductRequest,
  ProductFilterQuery,
  ProductResponse,
  UpdateProductRequest,
  UpdateProductStatusRequest
} from './products.types';

export function createProductsApi(client: HttpClient = apiClient) {
  return {
    list(filters?: ProductFilterQuery): Promise<PaginatedResult<ProductResponse>> {
      return client.getPaginated<ProductResponse>('/products', filters);
    },

    get(id: string): Promise<ProductResponse> {
      return client.get<ProductResponse>(`/products/${id}`);
    },

    ownerList(filters?: ProductFilterQuery): Promise<PaginatedResult<ProductResponse>> {
      return client.getPaginated<ProductResponse>('/shop-owner/products', filters);
    },

    ownerCreate(body: CreateProductRequest): Promise<ProductResponse> {
      return client.post<ProductResponse, CreateProductRequest>('/shop-owner/products', body);
    },

    ownerGet(id: string): Promise<ProductResponse> {
      return client.get<ProductResponse>(`/shop-owner/products/${id}`);
    },

    ownerUpdate(id: string, body: UpdateProductRequest): Promise<ProductResponse> {
      return client.patch<ProductResponse, UpdateProductRequest>(`/shop-owner/products/${id}`, body);
    },

    ownerDelete(id: string): Promise<ProductResponse> {
      return client.delete<ProductResponse>(`/shop-owner/products/${id}`);
    },

    ownerUpdateStatus(id: string, body: UpdateProductStatusRequest): Promise<ProductResponse> {
      return client.patch<ProductResponse, UpdateProductStatusRequest>(
        `/shop-owner/products/${id}/status`,
        body
      );
    }
  };
}

export const productsApi = createProductsApi();
