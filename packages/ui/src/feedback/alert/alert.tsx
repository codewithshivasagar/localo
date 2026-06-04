import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type AlertVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  description?: ReactNode;
  title?: ReactNode;
  variant?: AlertVariant;
}

const alertVariants = {
  default: 'border-localo-border bg-localo-surface text-localo-text',
  success: 'border-localo-success bg-localo-success/10 text-localo-success',
  warning: 'border-localo-warning bg-localo-warning/10 text-localo-warning',
  danger: 'border-localo-danger bg-localo-danger/10 text-localo-danger',
  info: 'border-localo-info bg-localo-info/10 text-localo-info'
} as const;

export function Alert({ children, className, description, title, variant = 'default', ...props }: AlertProps) {
  return (
    <div className={cn('rounded-localo-lg border p-4', alertVariants[variant], className)} role="alert" {...props}>
      {title ? <p className="font-semibold">{title}</p> : null}
      {description ? <p className="mt-1 text-sm leading-6">{description}</p> : null}
      {children}
    </div>
  );
}
