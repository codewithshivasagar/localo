'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { authApi, localoTokenStorage, type AuthUser } from '@localo/api-client';
import { AdminRoutes } from '../../../config';
import { ADMIN_AUTH_COPY, isAdminRole } from '../config';
import { loginSchema, type LoginFormValues } from '../schemas';

export interface AdminLoginState {
  errors: Partial<Record<keyof LoginFormValues, string>>;
  formError: string | null;
  isSubmitting: boolean;
}

const initialState: AdminLoginState = {
  errors: {},
  formError: null,
  isSubmitting: false
};

async function resolveSessionUser(sessionUser?: AuthUser): Promise<AuthUser> {
  return sessionUser ?? authApi.me();
}

export function useAdminLogin() {
  const router = useRouter();
  const [state, setState] = useState<AdminLoginState>(initialState);
  const [isPending, startTransition] = useTransition();

  const login = async (values: LoginFormValues) => {
    const parsed = loginSchema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;

      setState({
        errors: {
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0]
        },
        formError: null,
        isSubmitting: false
      });
      return;
    }

    setState({ errors: {}, formError: null, isSubmitting: true });

    try {
      const session = await authApi.login(parsed.data);
      const user = await resolveSessionUser(session.user);

      if (!isAdminRole(user.role)) {
        localoTokenStorage.clear();
        startTransition(() => router.replace(AdminRoutes.Unauthorized));
        return;
      }

      startTransition(() => router.replace(AdminRoutes.Dashboard));
    } catch {
      localoTokenStorage.clear();
      setState({
        errors: {},
        formError: ADMIN_AUTH_COPY.invalidLogin,
        isSubmitting: false
      });
    }
  };

  return {
    ...state,
    isSubmitting: state.isSubmitting || isPending,
    login
  };
}
