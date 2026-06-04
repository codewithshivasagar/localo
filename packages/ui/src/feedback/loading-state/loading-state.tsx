import type { HTMLAttributes, ReactNode } from 'react';
import { Spinner } from '../../primitives/spinner';
import { cn } from '../../utils/cn';

export interface LoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  description?: ReactNode;
  label?: ReactNode;
  spinnerSize?: 'sm' | 'md' | 'lg';
}

export function LoadingState({
  className,
  description,
  label = 'Loading',
  spinnerSize = 'md',
  ...props
}: LoadingStateProps) {
  return (
    <div className={cn('flex min-h-40 flex-col items-center justify-center gap-3 rounded-localo-xl border border-localo-border bg-localo-surface p-6 text-center', className)} {...props}>
      <Spinner size={spinnerSize} />
      <div>
        <p className="font-semibold text-localo-text">{label}</p>
        {description ? <p className="mt-1 text-sm text-localo-text-muted">{description}</p> : null}
      </div>
    </div>
  );
}
