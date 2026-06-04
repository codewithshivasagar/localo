import { apiClient, type HttpClient } from '../http/http-client';
import type { PaginatedResult } from '../types/pagination';
import type {
  AssignShopOwnerRequest,
  CreateShopRequest,
  PublicShopResponse,
  ShopFilterQuery,
  ShopResponse,
  UpdateBusinessHoursRequest,
  UpdateOwnShopRequest,
  UpdateShopLocationRequest,
  UpdateShopRequest,
  UpdateShopStatusRequest
} from './shops.types';
import type { ProductFilterQuery, ProductResponse } from '../products/products.types';

export function createShopsApi(client: HttpClient = apiClient) {
  return {
    adminList(filters?: ShopFilterQuery): Promise<PaginatedResult<ShopResponse>> {
      return client.getPaginated<ShopResponse>('/admin/shops', filters);
    },

    adminCreate(body: CreateShopRequest): Promise<ShopResponse> {
      return client.post<ShopResponse, CreateShopRequest>('/admin/shops', body);
    },

    adminGet(id: string): Promise<ShopResponse> {
      return client.get<ShopResponse>(`/admin/shops/${id}`);
    },

    adminUpdate(id: string, body: UpdateShopRequest): Promise<ShopResponse> {
      return client.patch<ShopResponse, UpdateShopRequest>(`/admin/shops/${id}`, body);
    },

    adminUpdateStatus(id: string, body: UpdateShopStatusRequest): Promise<ShopResponse> {
      return client.patch<ShopResponse, UpdateShopStatusRequest>(`/admin/shops/${id}/status`, body);
    },

    adminAssignOwner(id: string, body: AssignShopOwnerRequest): Promise<ShopResponse> {
      return client.patch<ShopResponse, AssignShopOwnerRequest>(`/admin/shops/${id}/assign-owner`, body);
    },

    ownerGetMe(): Promise<ShopResponse> {
      return client.get<ShopResponse>('/shop-owner/shops/me');
    },

    ownerUpdateMe(body: UpdateOwnShopRequest): Promise<ShopResponse> {
      return client.patch<ShopResponse, UpdateOwnShopRequest>('/shop-owner/shops/me', body);
    },

    ownerUpdateLocation(body: UpdateShopLocationRequest): Promise<ShopResponse> {
      return client.put<ShopResponse, UpdateShopLocationRequest>('/shop-owner/shops/me/location', body);
    },

    ownerUpdateBusinessHours(body: UpdateBusinessHoursRequest): Promise<ShopResponse> {
      return client.put<ShopResponse, UpdateBusinessHoursRequest>(
        '/shop-owner/shops/me/business-hours',
        body
      );
    },

    discover(filters?: ShopFilterQuery): Promise<PaginatedResult<PublicShopResponse>> {
      return client.getPaginated<PublicShopResponse>('/shops', filters);
    },

    discoverBySlug(slug: string): Promise<PublicShopResponse> {
      return client.get<PublicShopResponse>(`/shops/${slug}`);
    },

    discoverProducts(
      shopId: string,
      filters?: ProductFilterQuery
    ): Promise<PaginatedResult<ProductResponse>> {
      return client.getPaginated<ProductResponse>(`/shops/${shopId}/products`, filters);
    }
  };
}

export const shopsApi = createShopsApi();
