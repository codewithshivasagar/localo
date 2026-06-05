'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ShopResponse } from '@localo/api-client';
import { adminShopsApi } from '../config';

function resolveErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to load shop details.';
}

export function useAdminShopDetail(shopId: string) {
  const requestIdRef = useRef(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [shop, setShop] = useState<ShopResponse | null>(null);

  useEffect(() => {
    let isMounted = true;
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    const isInitialLoad = shop === null;

    setError(null);
    setIsLoading(isInitialLoad);
    setIsRefreshing(!isInitialLoad);

    adminShopsApi
      .adminGet(shopId)
      .then((nextShop) => {
        if (!isMounted || requestId !== requestIdRef.current) {
          return;
        }

        setShop(nextShop);
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
  }, [refreshKey, shopId]);

  const refresh = useCallback(() => {
    setRefreshKey((currentKey) => currentKey + 1);
  }, []);

  return {
    error,
    isLoading,
    isRefreshing,
    refresh,
    shop
  };
}
