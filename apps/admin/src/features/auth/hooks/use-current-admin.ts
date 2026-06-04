'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { localoTokenStorage, type AuthUser } from '@localo/api-client';
import { AdminRoutes } from '../../../config';
import { adminAuthApi, isAdminRole } from '../config';

export type CurrentAdminStatus = 'loading' | 'authenticated';

export interface UseCurrentAdminResult {
  status: CurrentAdminStatus;
  user: AuthUser | null;
}

export function useCurrentAdmin(): UseCurrentAdminResult {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadCurrentAdmin = async () => {
      const accessToken = localoTokenStorage.getAccessToken();

      if (!accessToken) {
        router.replace(AdminRoutes.Login);
        return;
      }

      try {
        const currentUser = await adminAuthApi.me();

        if (!isMounted) {
          return;
        }

        if (!isAdminRole(currentUser.role)) {
          localoTokenStorage.clear();
          router.replace(AdminRoutes.Unauthorized);
          return;
        }

        setUser(currentUser);
      } catch {
        localoTokenStorage.clear();
        router.replace(AdminRoutes.Login);
      }
    };

    void loadCurrentAdmin();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return {
    status: user ? 'authenticated' : 'loading',
    user
  };
}
