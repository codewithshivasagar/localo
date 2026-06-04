import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface MobileNavItem {
  href?: string;
  icon?: ReactNode;
  isActive?: boolean;
  label: ReactNode;
  onClick?: () => void;
}

export interface MobileNavProps extends HTMLAttributes<HTMLElement> {
  items: MobileNavItem[];
}

export function MobileNav({ className, items, ...props }: MobileNavProps) {
  return (
    <nav className={cn('fixed inset-x-0 bottom-0 z-40 border-t border-localo-border bg-localo-surface px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 shadow-localo-lg lg:hidden', className)} {...props}>
      <div className="grid grid-cols-4 gap-1">
        {items.map((item, index) => {
          const content = (
            <>
              {item.icon ? <span className="text-lg">{item.icon}</span> : null}
              <span className="truncate text-xs font-semibold">{item.label}</span>
            </>
          );
          const itemClassName = cn('flex min-h-14 touch-manipulation flex-col items-center justify-center gap-1 rounded-localo-md px-2 text-localo-text-muted', item.isActive && 'bg-localo-surface-muted text-localo-primary');

          return item.href ? (
            <a className={itemClassName} href={item.href} key={`${item.href}-${index}`} onClick={item.onClick}>
              {content}
            </a>
          ) : (
            <button className={itemClassName} key={index} onClick={item.onClick} type="button">
              {content}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
