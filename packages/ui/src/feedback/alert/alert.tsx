import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type AlertVariant = 'default' | 'success' | 'warning' | 'danger' | 'destructive' | 'info';
export type AlertSize = 'sm' | 'md';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  description?: ReactNode;
  size?: AlertSize;
  title?: ReactNode;
  variant?: AlertVariant;
}

const alertVariants = {
  default: 'border-localo-border bg-localo-surface text-localo-text',
  success: 'border-localo-success bg-localo-success/10 text-localo-success',
  warning: 'border-localo-warning bg-localo-warning/10 text-localo-warning',
  danger: 'border-localo-danger bg-localo-danger/10 text-localo-danger',
  destructive: 'border-localo-danger bg-localo-danger/10 text-localo-danger',
  info: 'border-localo-info bg-localo-info/10 text-localo-info'
} as const;

const alertSizes: Record<AlertSize, string> = {
  sm: 'p-3',
  md: 'p-4'
};

export function Alert({
  children,
  className,
  description,
  size = 'md',
  title,
  variant = 'default',
  ...props
}: AlertProps) {
  return (
    <div className={cn('rounded-localo-lg border', alertSizes[size], alertVariants[variant], className)} role="alert" {...props}>
      {title ? <p className="font-semibold">{title}</p> : null}
      {description ? <p className={cn('text-sm leading-6', title ? 'mt-1' : undefined)}>{description}</p> : null}
      {children}
    </div>
  );
}
