import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export function Dropdown({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('relative inline-block text-left', className)} {...props} />;
}

export function DropdownTrigger({ className, type = 'button', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn('inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-localo-lg border border-localo-border bg-localo-surface px-4 text-sm font-bold text-localo-text shadow-localo-sm transition hover:bg-localo-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-localo-primary/30', className)}
      type={type}
      {...props}
    />
  );
}

export function DropdownMenu({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('absolute right-0 z-30 mt-2 min-w-52 rounded-localo-xl border border-localo-border bg-localo-surface p-1.5 shadow-localo-lg shadow-slate-900/10', className)}
      role="menu"
      {...props}
    />
  );
}

export function DropdownItem({ className, type = 'button', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn('flex min-h-10 w-full touch-manipulation items-center rounded-localo-lg px-3 text-left text-sm font-semibold text-localo-text transition hover:bg-localo-surface-muted disabled:cursor-not-allowed disabled:opacity-55', className)}
      role="menuitem"
      type={type}
      {...props}
    />
  );
}
