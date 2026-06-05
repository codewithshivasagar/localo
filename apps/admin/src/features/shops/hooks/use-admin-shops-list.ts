'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PaginatedResult, ShopFilterQuery, ShopResponse } from '@localo/api-client';
import {
  ADMIN_SHOPS_DEFAULT_LIMIT,
  ADMIN_SHOPS_DEFAULT_PAGE,
  adminShopsApi
} from '../config';

export interface AdminShopListFilters {
  limit: number;
  page: number;
  search: string;
  status: string;
  verificationStatus: string;
}

export interface AdminShopListMetrics {
  active: number;
  pendingApproval: number;
  suspended: number;
  total: number;
}

const initialFilters: AdminShopListFilters = {
  limit: ADMIN_SHOPS_DEFAULT_LIMIT,
  page: ADMIN_SHOPS_DEFAULT_PAGE,
  search: '',
  status: '',
  verificationStatus: ''
};

function toApiFilters(filters: AdminShopListFilters): ShopFilterQuery {
  return {
    limit: filters.limit,
    page: filters.page,
    search: filters.search || undefined,
    status: filters.status || undefined,
    verificationStatus: filters.verificationStatus || undefined
  };
}

function resolveErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to load shops.';
}

function createMetrics(result: PaginatedResult<ShopResponse> | null): AdminShopListMetrics {
  const shops = result?.data ?? [];

  return {
    active: shops.filter((shop) => shop.status === 'ACTIVE').length,
    pendingApproval: shops.filter((shop) => shop.verificationStatus === 'PENDING').length,
    suspended: shops.filter((shop) => shop.status === 'SUSPENDED').length,
    total: result?.meta?.total ?? shops.length
  };
}

export function useAdminShopsList() {
  const hasLoadedRef = useRef(false);
  const requestIdRef = useRef(0);
  const [filters, setFilters] = useState<AdminShopListFilters>(initialFilters);
  const [result, setResult] = useState<PaginatedResult<ShopResponse> | null>(null);
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

    adminShopsApi
      .adminList(toApiFilters(filters))
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
    <TKey extends keyof AdminShopListFilters>(key: TKey, value: AdminShopListFilters[TKey]) => {
      setFilters((currentFilters) => ({
        ...currentFilters,
        [key]: value,
        page: key === 'page' ? Number(value) : ADMIN_SHOPS_DEFAULT_PAGE
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

  const hasActiveFilters = Boolean(filters.search || filters.status || filters.verificationStatus);
  const metrics = useMemo(() => createMetrics(result), [result]);

  return {
    error,
    filters,
    hasActiveFilters,
    isLoading,
    isRefreshing,
    metrics,
    pagination: result?.meta,
    refresh,
    resetFilters,
    result,
    shops: result?.data ?? [],
    updateFilter
  };
}
