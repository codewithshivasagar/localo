'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CategoryResponse } from '@localo/api-client';
import { adminCategoriesApi } from '../config';

function resolveErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to load category details.';
}

export function useAdminCategoryDetail(categoryId: string) {
  const requestIdRef = useRef(0);
  const [category, setCategory] = useState<CategoryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!categoryId) {
      setCategory(null);
      setError(null);
      setIsLoading(false);
      setIsRefreshing(false);
      return;
    }

    let isMounted = true;
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    const isInitialLoad = category === null;

    setError(null);
    setIsLoading(isInitialLoad);
    setIsRefreshing(!isInitialLoad);

    adminCategoriesApi
      .get(categoryId)
      .then((nextCategory) => {
        if (!isMounted || requestId !== requestIdRef.current) {
          return;
        }

        setCategory(nextCategory);
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
  }, [categoryId, refreshKey]);

  const refresh = useCallback(() => {
    setRefreshKey((currentKey) => currentKey + 1);
  }, []);

  return {
    category,
    error,
    isLoading,
    isRefreshing,
    refresh
  };
}
