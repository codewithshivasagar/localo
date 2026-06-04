import { cn } from '../../utils/cn';
import type { InputProps } from './input.types';

export function Input({ className, error, leftAddon, rightAddon, type = 'text', ...props }: InputProps) {
  const input = (
    <input
      className={cn(
        'min-h-11 w-full rounded-localo-md border border-localo-border bg-localo-surface px-3 text-base text-localo-text outline-none transition placeholder:text-localo-text-muted focus:border-localo-primary focus:ring-2 focus:ring-localo-primary/20 disabled:cursor-not-allowed disabled:bg-localo-surface-muted disabled:opacity-70 sm:text-sm',
        error && 'border-localo-danger focus:border-localo-danger focus:ring-localo-danger/20',
        Boolean(leftAddon || rightAddon) && 'border-0 focus:ring-0',
        className
      )}
      type={type}
      {...props}
    />
  );

  if (!leftAddon && !rightAddon) {
    return input;
  }

  return (
    <div className={cn('flex min-h-11 w-full items-center rounded-localo-md border border-localo-border bg-localo-surface focus-within:border-localo-primary focus-within:ring-2 focus-within:ring-localo-primary/20', error && 'border-localo-danger focus-within:border-localo-danger focus-within:ring-localo-danger/20')}>
      {leftAddon ? <span className="pl-3 text-localo-text-muted">{leftAddon}</span> : null}
      {input}
      {rightAddon ? <span className="pr-3 text-localo-text-muted">{rightAddon}</span> : null}
    </div>
  );
}
