'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CategoryFilterQuery, CategoryResponse, PaginatedResult } from '@localo/api-client';
import {
  ADMIN_CATEGORIES_DEFAULT_LIMIT,
  ADMIN_CATEGORIES_DEFAULT_PAGE,
  adminCategoriesApi
} from '../config';
import type { AdminCategoryListFilters, AdminCategoryListMetrics } from '../types';

const initialFilters: AdminCategoryListFilters = {
  isActive: '',
  limit: ADMIN_CATEGORIES_DEFAULT_LIMIT,
  page: ADMIN_CATEGORIES_DEFAULT_PAGE,
  scope: 'all',
  search: ''
};

function toApiFilters(filters: AdminCategoryListFilters): CategoryFilterQuery {
  return {
    isActive: filters.isActive === '' ? undefined : filters.isActive === 'true',
    limit: filters.limit,
    page: filters.page,
    search: filters.search || undefined
  };
}

function resolveErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to load categories.';
}

function filterByScope(categories: CategoryResponse[], scope: AdminCategoryListFilters['scope']) {
  if (scope === 'root') {
    return categories.filter((category) => !category.parentId);
  }

  if (scope === 'children') {
    return categories.filter((category) => Boolean(category.parentId));
  }

  return categories;
}

function createMetrics(categories: CategoryResponse[], total: number): AdminCategoryListMetrics {
  return {
    active: categories.filter((category) => category.isActive).length,
    inactive: categories.filter((category) => !category.isActive).length,
    root: categories.filter((category) => !category.parentId).length,
    subcategories: categories.filter((category) => Boolean(category.parentId)).length,
    total
  };
}

export function useAdminCategoriesList() {
  const hasLoadedRef = useRef(false);
  const requestIdRef = useRef(0);
  const [filters, setFilters] = useState<AdminCategoryListFilters>(initialFilters);
  const [result, setResult] = useState<PaginatedResult<CategoryResponse> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    const isInitialLoad = !hasLoadedRef.current;

    setError(null);
    setIsLoading(isInitialLoad);
    setIsRefreshing(!isInitialLoad);

    adminCategoriesApi
      .list(toApiFilters(filters))
      .then((nextResult) => {
        if (!isMounted || requestId !== requestIdRef.current) {
          return;
        }

        setResult(nextResult);
        hasLoadedRef.current = true;
      })
      .catch((nextError: unknown) => {
        if (!isMounted || requestId !== requestIdRef.current) {
          return;
        }

        setError(resolveErrorMessage(nextError));
      })
      .finally(() => {
        if (!isMounted || requestId !== requestIdRef.current) {
          return;
        }

        setIsLoading(false);
        setIsRefreshing(false);
      });

    return () => {
      isMounted = false;
    };
  }, [filters, refreshKey]);

  const updateFilter = useCallback(
    <TKey extends keyof AdminCategoryListFilters>(key: TKey, value: AdminCategoryListFilters[TKey]) => {
      setFilters((currentFilters) => ({
        ...currentFilters,
        [key]: value,
        page: key === 'page' ? Number(value) : ADMIN_CATEGORIES_DEFAULT_PAGE
      }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const refresh = useCallback(() => {
    setRefreshKey((currentKey) => currentKey + 1);
  }, []);

  const visibleCategories = useMemo(
    () => filterByScope(result?.data ?? [], filters.scope),
    [filters.scope, result]
  );

  const hasActiveFilters = Boolean(filters.search || filters.isActive || filters.scope !== 'all');
  const metrics = useMemo(
    () => createMetrics(visibleCategories, result?.meta?.total ?? visibleCategories.length),
    [result?.meta?.total, visibleCategories]
  );

  return {
    categories: visibleCategories,
    error,
    filters,
    hasActiveFilters,
    isLoading,
    isRefreshing,
    metrics,
    pagination: result?.meta,
    refresh,
    resetFilters,
    updateFilter
  };
}

