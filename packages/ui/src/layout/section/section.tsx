import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn('py-6 sm:py-8', className)} {...props} />;
}
