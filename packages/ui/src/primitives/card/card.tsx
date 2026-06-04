import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardVariant = 'default' | 'elevated' | 'subtle';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  padded?: boolean;
  variant?: CardVariant;
}

const cardPadding: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-4 sm:p-5',
  lg: 'p-5 sm:p-8'
};

const cardVariants: Record<CardVariant, string> = {
  default: 'border-localo-border bg-localo-surface shadow-localo-sm',
  elevated: 'border-localo-border bg-localo-surface shadow-localo-lg',
  subtle: 'border-localo-border bg-localo-surface/90 shadow-none'
};

export function Card({ className, padded = true, padding, variant = 'default', ...props }: CardProps) {
  const resolvedPadding = padding ?? (padded ? 'md' : 'none');

  return (
    <div
      className={cn(
        'rounded-localo-2xl border',
        cardVariants[variant],
        cardPadding[resolvedPadding],
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-5 space-y-1.5 text-center sm:text-left', className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-2xl font-bold tracking-tight text-localo-text sm:text-3xl', className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm leading-6 text-localo-text-muted', className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-5', className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end', className)} {...props} />;
}
