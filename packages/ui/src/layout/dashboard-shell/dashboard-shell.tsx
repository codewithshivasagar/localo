import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface DashboardShellProps extends HTMLAttributes<HTMLDivElement> {
  sidebar?: ReactNode;
  topbar?: ReactNode;
}

export function DashboardShell({ children, className, sidebar, topbar, ...props }: DashboardShellProps) {
  return (
    <div
      className={cn(
        'h-dvh overflow-hidden bg-localo-background text-localo-text lg:grid lg:grid-cols-[18rem_1fr]',
        className
      )}
      {...props}
    >
      {sidebar ? (
        <aside className="hidden h-dvh overflow-hidden bg-localo-panel lg:block">
          {sidebar}
        </aside>
      ) : null}

      <div className="flex min-h-0 min-w-0 flex-col overflow-hidden">
        {topbar ? <div className="shrink-0">{topbar}</div> : null}

        <main className="min-h-0 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
