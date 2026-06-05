import type { HTMLAttributes, ReactNode } from 'react';

export interface BreadcrumbItem {
  current?: boolean;
  href?: string;
  label: ReactNode;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  renderLink?: (item: BreadcrumbItem, className: string) => ReactNode;
  separator?: ReactNode;
}
