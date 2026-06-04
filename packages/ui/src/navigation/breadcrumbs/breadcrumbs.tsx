import type { AnchorHTMLAttributes, HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export function Breadcrumbs({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <nav aria-label="Breadcrumb" className={cn('overflow-x-auto', className)} {...props} />;
}

export function BreadcrumbList({ className, ...props }: HTMLAttributes<HTMLOListElement>) {
  return <ol className={cn('flex min-h-10 items-center gap-2 whitespace-nowrap text-sm text-localo-text-muted', className)} {...props} />;
}

export function BreadcrumbItem({ className, ...props }: HTMLAttributes<HTMLLIElement>) {
  return <li className={cn('inline-flex items-center gap-2', className)} {...props} />;
}

export function BreadcrumbLink({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn('font-medium hover:text-localo-text', className)} {...props} />;
}

export function BreadcrumbSeparator({ className, children = '/', ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span aria-hidden="true" className={cn('text-localo-border', className)} {...props}>{children}</span>;
}
