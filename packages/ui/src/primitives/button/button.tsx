import { cn } from '../../utils/cn';
import type { ButtonProps, ButtonSize, ButtonVariant } from './button.types';

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-localo-primary text-localo-primary-foreground shadow-sm hover:brightness-95',
  secondary: 'bg-localo-surface-muted text-localo-text hover:bg-localo-border',
  outline: 'border border-localo-border bg-localo-surface text-localo-text hover:bg-localo-surface-muted',
  ghost: 'text-localo-text hover:bg-localo-surface-muted',
  destructive: 'bg-localo-danger text-white shadow-sm hover:brightness-95',
  muted: 'bg-localo-surface text-localo-text-muted hover:text-localo-text'
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'min-h-10 px-3 text-sm',
  md: 'min-h-11 px-4 text-sm',
  lg: 'min-h-12 px-5 text-base',
  icon: 'min-h-11 w-11 px-0'
};

export function Button({
  children,
  className,
  disabled,
  fullWidth,
  isLoading,
  leftIcon,
  rightIcon,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex touch-manipulation items-center justify-center gap-2 rounded-localo-md font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-localo-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-55',
        buttonVariants[variant],
        buttonSizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading ? <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" /> : leftIcon}
      <span>{children}</span>
      {!isLoading ? rightIcon : null}
    </button>
  );
}
