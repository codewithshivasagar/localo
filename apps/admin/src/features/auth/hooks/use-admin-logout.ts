'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { authApi, localoTokenStorage } from '@localo/api-client';
import { AdminRoutes } from '../../../config';

export function useAdminLogout() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const logout = async () => {
    const refreshToken = localoTokenStorage.getRefreshToken();

    try {
      if (refreshToken) {
        await authApi.logout({ refreshToken });
      }
    } catch {
      // Local tokens are cleared below even when the API is unreachable.
    } finally {
      localoTokenStorage.clear();
      startTransition(() => router.replace(AdminRoutes.Login));
    }
  };

  return {
    isLoggingOut: isPending,
    logout
  };
}
