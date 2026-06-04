import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export function Tabs({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-4', className)} {...props} />;
}

export function TabsList({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex min-h-12 gap-1 overflow-x-auto rounded-localo-lg bg-localo-surface-muted p-1', className)}
      role="tablist"
      {...props}
    />
  );
}

export interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export function TabButton({ className, isActive, type = 'button', ...props }: TabButtonProps) {
  return (
    <button
      className={cn('min-h-10 shrink-0 touch-manipulation rounded-localo-md px-4 text-sm font-semibold text-localo-text-muted transition hover:text-localo-text', isActive && 'bg-localo-surface text-localo-text shadow-localo-sm', className)}
      role="tab"
      type={type}
      {...props}
    />
  );
}

export function TabsPanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('outline-none', className)} role="tabpanel" {...props} />;
}
