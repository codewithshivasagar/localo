import { cn } from '../utils/cn';
import type { BreadcrumbItem, BreadcrumbsProps } from './breadcrumbs.types';

function isCurrentItem(item: BreadcrumbItem, index: number, items: BreadcrumbItem[]) {
  return item.current || index === items.length - 1;
}

export function Breadcrumbs({
  className,
  items,
  renderLink,
  separator = '/',
  ...props
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('overflow-x-auto', className)} {...props}>
      <ol className="flex min-h-10 items-center gap-2 whitespace-nowrap text-sm">
        {items.map((item, index) => {
          const isCurrent = isCurrentItem(item, index, items);
          const linkClassName = cn(
            'rounded-localo-sm font-semibold text-localo-text-muted transition hover:text-localo-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-localo-primary/30',
            isCurrent && 'pointer-events-none text-localo-text'
          );

          return (
            <li className="inline-flex items-center gap-2" key={`${String(item.label)}-${index}`}>
              {index > 0 ? (
                <span aria-hidden="true" className="text-localo-border">
                  {separator}
                </span>
              ) : null}
              {item.href && !isCurrent ? (
                renderLink ? (
                  renderLink(item, linkClassName)
                ) : (
                  <a className={linkClassName} href={item.href}>
                    {item.label}
                  </a>
                )
              ) : (
                <span aria-current={isCurrent ? 'page' : undefined} className={linkClassName}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
