'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CategoryResponse } from '@localo/api-client';
import { adminCategoriesApi } from '../config';

function resolveErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to load parent categories.';
}

export function useCategoryParentOptions() {
  const requestIdRef = useRef(0);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    setError(null);
    setIsLoading(true);

    adminCategoriesApi
      .list({ limit: 100, page: 1 })
      .then((result) => {
        if (!isMounted || requestId !== requestIdRef.current) {
          return;
        }

        setCategories(result.data);
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
      });

    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  const refresh = useCallback(() => {
    setRefreshKey((currentKey) => currentKey + 1);
  }, []);

  return {
    categories,
    error,
    isLoading,
    refresh
  };
}

