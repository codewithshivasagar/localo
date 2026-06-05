import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  actions?: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
}

export function PageHeader({ actions, className, description, eyebrow, title, ...props }: PageHeaderProps) {
  return (
    <header className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)} {...props}>
      <div className="min-w-0 space-y-1">
        {eyebrow ? <p className="text-xs font-bold uppercase tracking-wide text-localo-primary">{eyebrow}</p> : null}
        <h1 className="text-3xl font-black tracking-tight text-localo-text sm:text-4xl">{title}</h1>
        {description ? <p className="max-w-2xl text-sm leading-6 text-localo-text-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:justify-end">{actions}</div> : null}
    </header>
  );
}
