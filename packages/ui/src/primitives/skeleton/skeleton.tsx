import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-localo-md bg-localo-surface-muted', className)} {...props} />;
}
