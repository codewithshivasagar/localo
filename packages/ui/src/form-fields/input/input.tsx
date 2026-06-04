import { cn } from '../../utils/cn';
import type { InputProps } from './input.types';

export function Input({
  className,
  error,
  leftAddon,
  leftIcon,
  rightAddon,
  rightIcon,
  type = 'text',
  wrapperClassName,
  ...props
}: InputProps) {
  const leading = leftIcon ?? leftAddon;
  const trailing = rightIcon ?? rightAddon;
  const input = (
    <input
      aria-invalid={error || undefined}
      className={cn(
        'min-h-12 w-full rounded-localo-lg border border-localo-border bg-localo-surface px-3 text-base text-localo-text outline-none transition placeholder:text-localo-text-muted focus:border-localo-primary focus:ring-2 focus:ring-localo-primary/20 disabled:cursor-not-allowed disabled:bg-localo-surface-muted disabled:opacity-70 sm:text-sm',
        error && 'border-localo-danger focus:border-localo-danger focus:ring-localo-danger/20',
        Boolean(leading || trailing) && 'border-0 focus:ring-0',
        className
      )}
      type={type}
      {...props}
    />
  );

  if (!leading && !trailing) {
    return input;
  }

  return (
    <div
      className={cn(
        'flex min-h-12 w-full items-center rounded-localo-lg border border-localo-border bg-localo-surface shadow-[0_1px_0_rgb(15_23_42_/_0.03)] transition focus-within:border-localo-primary focus-within:ring-2 focus-within:ring-localo-primary/20',
        error && 'border-localo-danger focus-within:border-localo-danger focus-within:ring-localo-danger/20',
        wrapperClassName
      )}
    >
      {leading ? <span className="flex min-w-11 items-center justify-center pl-1 text-localo-text-muted">{leading}</span> : null}
      {input}
      {trailing ? <span className="flex min-w-11 items-center justify-center pr-1 text-localo-text-muted">{trailing}</span> : null}
    </div>
  );
}
