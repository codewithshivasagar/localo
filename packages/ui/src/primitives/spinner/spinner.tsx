import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
}

const spinnerSizes = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-9 w-9'
} as const;

export function Spinner({ className, size = 'md', ...props }: SpinnerProps) {
  return (
    <span
      aria-label="Loading"
      className={cn('inline-block animate-spin rounded-full border-2 border-current border-r-transparent', spinnerSizes[size], className)}
      role="status"
      {...props}
    />
  );
}
