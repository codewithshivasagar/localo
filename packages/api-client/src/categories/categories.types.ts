import type { ApiRecord } from '../types/api-response';
import type { PaginationQuery } from '../types/pagination';

export interface CategoryMediaResponse {
  id: string;
  publicUrl?: string | null;
  altText?: string | null;
}

export interface CategoryParentResponse {
  id: string;
  name: string;
  slug: string;
}

export interface CategoryResponse {
  id: string;
  parentId?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  level: number;
  sortOrder: number;
  isActive: boolean;
  metadata: unknown;
  createdAt: string;
  updatedAt: string;
  parent?: CategoryParentResponse | null;
  iconMedia?: CategoryMediaResponse | null;
  imageMedia?: CategoryMediaResponse | null;
}

export interface CategoryFilterQuery extends PaginationQuery {
  search?: string;
  parentId?: string;
  isActive?: boolean;
}

export type CreateCategoryRequest = ApiRecord & {
  name: string;
};

export type UpdateCategoryRequest = ApiRecord;
