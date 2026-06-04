import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface NavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: ReactNode;
  isActive?: boolean;
}

export function NavItem({ children, className, icon, isActive, ...props }: NavItemProps) {
  return (
    <a
      className={cn('flex min-h-11 touch-manipulation items-center gap-3 rounded-localo-md px-3 text-sm font-semibold text-localo-text-muted transition hover:bg-localo-surface-muted hover:text-localo-text', isActive && 'bg-localo-primary text-localo-primary-foreground hover:bg-localo-primary hover:text-localo-primary-foreground', className)}
      {...props}
    >
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span className="truncate">{children}</span>
    </a>
  );
}
