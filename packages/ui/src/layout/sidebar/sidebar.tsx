import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  mobileOpen?: boolean;
}

export function Sidebar({ className, collapsed, mobileOpen, ...props }: SidebarProps) {
  return (
    <nav
      className={cn(
        'flex h-dvh w-72 shrink-0 flex-col overflow-hidden bg-localo-surface text-localo-text transition-transform',
        collapsed && 'w-20',
        mobileOpen === false && '-translate-x-full lg:translate-x-0',
        className
      )}
      {...props}
    />
  );
}

export function SidebarHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex min-h-16 items-center gap-3 border-b border-localo-border/15 px-4', className)} {...props} />;
}

export function SidebarContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex-1 overflow-y-auto px-3 py-4', className)} {...props} />;
}

export function SidebarFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('border-t border-localo-border/15 p-3', className)} {...props} />;
}

export function SidebarGroup({ className, title, ...props }: HTMLAttributes<HTMLDivElement> & { title?: ReactNode }) {
  return (
    <div className={cn('space-y-2 py-2', className)} {...props}>
      {title ? <p className="px-3 text-xs font-bold uppercase tracking-wide text-localo-text-muted">{title}</p> : null}
      {props.children}
    </div>
  );
}

export function SidebarItem({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-1', className)} {...props} />;
}

export function SidebarLink({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn('flex min-h-11 touch-manipulation items-center gap-3 rounded-localo-md px-3 text-sm font-semibold text-localo-text-muted hover:bg-localo-surface-muted hover:text-localo-text', className)} {...props} />;
}

export function SidebarCollapseButton({ className, type = 'button', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn('inline-flex min-h-10 min-w-10 touch-manipulation items-center justify-center rounded-localo-md text-localo-text-muted hover:bg-localo-surface-muted hover:text-localo-text', className)} type={type} {...props} />;
}
