import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export function PageContainer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <main className={cn('mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8', className)} {...props} />;
}
