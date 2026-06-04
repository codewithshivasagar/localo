import type { ApiRecord } from '../types/api-response';
import type { PaginationQuery } from '../types/pagination';

export interface ProductShopSummary {
  id: string;
  name: string;
  slug: string;
}

export interface ProductCategorySummary {
  id: string;
  name: string;
  slug: string;
  isPrimary: boolean;
}

export interface ProductMediaResponse {
  id: string;
  mediaId: string;
  publicUrl?: string | null;
  altText?: string | null;
  sortOrder: number;
  isPrimary: boolean;
}

export interface ProductResponse {
  id: string;
  shopId: string;
  title: string;
  slug: string;
  description?: string | null;
  shortDescription?: string | null;
  productType: string;
  status: string;
  sku?: string | null;
  searchKeywords: string[];
  tags: string[];
  basePrice?: string | null;
  compareAtPrice?: string | null;
  currencyCode: string;
  taxRate: string;
  isFeatured: boolean;
  ratingAvg: string;
  ratingCount: number;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  shop?: ProductShopSummary;
  categories: ProductCategorySummary[];
  media: ProductMediaResponse[];
}

export interface ProductFilterQuery extends PaginationQuery {
  search?: string;
  category?: string;
  categoryId?: string;
  shopId?: string;
  priceMin?: number;
  priceMax?: number;
  hasDiscount?: boolean;
  tags?: readonly string[];
  status?: string;
  visibility?: string;
}

export type CreateProductRequest = ApiRecord & {
  title: string;
};

export type UpdateProductRequest = ApiRecord;

export interface UpdateProductStatusRequest {
  status: string;
}
