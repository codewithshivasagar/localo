import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface TopbarProps extends HTMLAttributes<HTMLElement> {
  actions?: ReactNode;
  leading?: ReactNode;
}

export function Topbar({ actions, children, className, leading, ...props }: TopbarProps) {
  return (
    <header className={cn('sticky top-0 z-20 flex min-h-16 items-center gap-3 border-b border-localo-border bg-localo-surface/95 px-4 backdrop-blur sm:px-6', className)} {...props}>
      {leading}
      <div className="min-w-0 flex-1">{children}</div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}
