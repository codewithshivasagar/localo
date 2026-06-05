import type { ReactNode } from 'react';
import { DashboardShell } from '@localo/ui';
import { AdminSidebarTemplate } from '../admin-sidebar';
import { AdminTopbarTemplate } from '../admin-topbar';

export interface AdminShellTemplateProps {
  children: ReactNode;
}

export function AdminShellTemplate({ children }: AdminShellTemplateProps) {
  return (
    <DashboardShell
      className="bg-localo-background lg:grid-cols-[17.5rem_minmax(0,1fr)]"
      sidebar={<AdminSidebarTemplate />}
      topbar={<AdminTopbarTemplate />}
    >
      {children}
    </DashboardShell>
  );
}
