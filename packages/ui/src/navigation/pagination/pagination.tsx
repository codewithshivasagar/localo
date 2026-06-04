import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { Button } from '../../primitives/button';
import { cn } from '../../utils/cn';

export function Pagination({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <nav aria-label="Pagination" className={cn('flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between', className)} {...props} />;
}

export function PaginationInfo({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-localo-text-muted', className)} {...props} />;
}

export function PaginationActions({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('grid grid-cols-2 gap-2 sm:flex sm:items-center', className)} {...props} />;
}

export function PaginationButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <Button fullWidth variant="outline" {...props} />;
}
