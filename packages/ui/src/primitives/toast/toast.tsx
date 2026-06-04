import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type ToastVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  action?: ReactNode;
  description?: ReactNode;
  title?: ReactNode;
  variant?: ToastVariant;
}

const toastVariants = {
  default: 'border-localo-border',
  success: 'border-localo-success',
  warning: 'border-localo-warning',
  danger: 'border-localo-danger',
  info: 'border-localo-info'
} as const;

export function Toast({ action, className, description, title, variant = 'default', ...props }: ToastProps) {
  return (
    <div className={cn('flex w-full items-start justify-between gap-3 rounded-localo-lg border bg-localo-surface p-4 shadow-localo-md', toastVariants[variant], className)} role="status" {...props}>
      <div className="space-y-1">
        {title ? <p className="font-semibold text-localo-text">{title}</p> : null}
        {description ? <p className="text-sm leading-5 text-localo-text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function ToastViewport({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('fixed inset-x-3 bottom-3 z-50 flex flex-col gap-3 sm:left-auto sm:w-96', className)} {...props} />;
}
