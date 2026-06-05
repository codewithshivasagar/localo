'use client';

import { Badge, Button, Icon, Input, Topbar } from '@localo/ui';
import { useAdminLogout } from '../../features/auth';
import { adminAppConfig } from '../../config';

export function AdminTopbarTemplate() {
  const { isLoggingOut, logout } = useAdminLogout();

  return (
    <Topbar
      actions={
        <>
          <Input
            aria-label="Admin search"
            className="hidden min-h-10 w-72 lg:block"
            leftIcon={<Icon name="search" size="sm" tone="muted" />}
            placeholder="Search anything..."
            readOnly
          />
          <Badge variant="success">Protected</Badge>
          <Button isLoading={isLoggingOut} loadingLabel="Signing out" onClick={() => void logout()} size="sm" variant="outline">
            Logout
          </Button>
        </>
      }
      className="bg-localo-surface/95 shadow-sm shadow-slate-900/5"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-localo-primary">Admin Console</p>
        <p className="text-sm font-semibold text-localo-text">{adminAppConfig.brand.tagline}</p>
      </div>
    </Topbar>
  );
}
