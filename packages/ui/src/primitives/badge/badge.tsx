import { cn } from '../../utils/cn';
import type { BadgeProps, BadgeVariant } from './badge.types';

const badgeVariants: Record<BadgeVariant, string> = {
  primary: 'bg-localo-primary text-localo-primary-foreground',
  secondary: 'bg-localo-surface-muted text-localo-text',
  success: 'bg-localo-success/10 text-localo-success',
  warning: 'bg-localo-warning/10 text-localo-warning',
  danger: 'bg-localo-danger/10 text-localo-danger',
  info: 'bg-localo-info/10 text-localo-info',
  muted: 'bg-localo-surface-muted text-localo-text-muted',
  outline: 'border border-localo-border bg-localo-surface text-localo-text'
};

export function Badge({ className, variant = 'secondary', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex min-h-7 items-center rounded-localo-full px-2.5 text-xs font-semibold',
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}
