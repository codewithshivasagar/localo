'use client';

import { useEffect, useState } from 'react';
import type { CategoryResponse } from '@localo/api-client';
import { adminCategoriesApi } from '../config';

function resolveErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unable to load categories.';
}

export function useCreateShopCategories() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    adminCategoriesApi
      .list({ isActive: true, limit: 100 })
      .then((result) => {
        if (!isMounted) {
          return;
        }

        setCategories(result.data);
      })
      .catch((nextError: unknown) => {
        if (!isMounted) {
          return;
        }

        setError(resolveErrorMessage(nextError));
      })
      .finally(() => {
        if (!isMounted) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, error, isLoading };
}
