import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface DashboardShellProps extends HTMLAttributes<HTMLDivElement> {
  sidebar?: ReactNode;
  topbar?: ReactNode;
}

export function DashboardShell({ children, className, sidebar, topbar, ...props }: DashboardShellProps) {
  return (
    <div className={cn('min-h-dvh bg-localo-background text-localo-text lg:grid lg:grid-cols-[18rem_1fr]', className)} {...props}>
      {sidebar ? <aside className="hidden border-r border-localo-border bg-localo-surface lg:block">{sidebar}</aside> : null}
      <div className="min-w-0">
        {topbar}
        {children}
      </div>
    </div>
  );
}
