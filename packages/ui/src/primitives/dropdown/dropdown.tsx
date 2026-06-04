import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export function Dropdown({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('relative inline-block text-left', className)} {...props} />;
}

export function DropdownTrigger({ className, type = 'button', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn('inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-localo-md border border-localo-border bg-localo-surface px-4 text-sm font-semibold text-localo-text shadow-localo-sm', className)}
      type={type}
      {...props}
    />
  );
}

export function DropdownMenu({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('absolute right-0 z-30 mt-2 min-w-48 rounded-localo-lg border border-localo-border bg-localo-surface p-1 shadow-localo-lg', className)}
      role="menu"
      {...props}
    />
  );
}

export function DropdownItem({ className, type = 'button', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn('flex min-h-10 w-full touch-manipulation items-center rounded-localo-md px-3 text-left text-sm text-localo-text hover:bg-localo-surface-muted', className)}
      role="menuitem"
      type={type}
      {...props}
    />
  );
}
