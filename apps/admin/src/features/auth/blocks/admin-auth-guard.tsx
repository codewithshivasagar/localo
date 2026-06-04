'use client';

import type { ReactNode } from 'react';
import { LoadingState } from '@localo/ui';
import { useCurrentAdmin } from '../hooks';

export interface AdminAuthGuardProps {
  children: ReactNode;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const { status } = useCurrentAdmin();

  if (status === 'loading') {
    return (
      <div className="grid min-h-dvh place-items-center bg-localo-background p-6">
        <LoadingState description="Checking your admin session." label="Loading Localo Admin" spinnerSize="lg" />
      </div>
    );
  }

  return children;
}
