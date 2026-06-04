import type { ReactNode } from 'react';
import { AdminAuthGuard } from '../../features/auth';
import { AdminRootTemplate, AdminShellTemplate } from '../../templates';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthGuard>
      <AdminRootTemplate>
        <AdminShellTemplate>{children}</AdminShellTemplate>
      </AdminRootTemplate>
    </AdminAuthGuard>
  );
}
