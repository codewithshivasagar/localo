import type { PaginationMeta } from '@localo/api-client';
import type { CategoryResponse } from '@localo/api-client';

export interface AdminCategoryListFilters {
  isActive: string;
  limit: number;
  page: number;
  scope: 'all' | 'root' | 'children';
  search: string;
}

export interface AdminCategoryListMetrics {
  active: number;
  inactive: number;
  root: number;
  subcategories: number;
  total: number;
}

export interface AdminCategoryParentOption {
  id: string;
  isActive: boolean;
  level: number;
  name: string;
  slug: string;
}

export interface AdminCategoryListResult {
  categories: CategoryResponse[];
  error: string | null;
  filters: AdminCategoryListFilters;
  hasActiveFilters: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  metrics: AdminCategoryListMetrics;
  pagination?: PaginationMeta;
  refresh: () => void;
  resetFilters: () => void;
  updateFilter: <TKey extends keyof AdminCategoryListFilters>(
    key: TKey,
    value: AdminCategoryListFilters[TKey]
  ) => void;
}

