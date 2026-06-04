'use client';

import { Badge, Button, Topbar } from '@localo/ui';
import { useAdminLogout } from '../../features/auth';
import { adminAppConfig } from '../../config';

export function AdminTopbarTemplate() {
  const { isLoggingOut, logout } = useAdminLogout();

  return (
    <Topbar
      actions={
        <>
          <Badge variant="success">Protected</Badge>
          <Button isLoading={isLoggingOut} loadingLabel="Signing out" onClick={() => void logout()} size="sm" variant="outline">
            Logout
          </Button>
        </>
      }
      className="bg-localo-surface/90"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-localo-primary">Admin Console</p>
        <p className="text-sm font-semibold text-localo-text">{adminAppConfig.brand.tagline}</p>
      </div>
    </Topbar>
  );
}
