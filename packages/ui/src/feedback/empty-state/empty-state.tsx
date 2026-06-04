import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  action?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  title: ReactNode;
}

export function EmptyState({ action, className, description, icon, title, ...props }: EmptyStateProps) {
  return (
    <div className={cn('flex min-h-56 flex-col items-center justify-center rounded-localo-xl border border-dashed border-localo-border bg-localo-surface p-6 text-center', className)} {...props}>
      {icon ? <div className="mb-4 text-localo-text-muted">{icon}</div> : null}
      <h3 className="text-lg font-bold text-localo-text">{title}</h3>
      {description ? <p className="mt-2 max-w-md text-sm leading-6 text-localo-text-muted">{description}</p> : null}
      {action ? <div className="mt-5 w-full sm:w-auto">{action}</div> : null}
    </div>
  );
}
