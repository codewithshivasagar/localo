import type { SelectHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface SelectOption {
  disabled?: boolean;
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options?: SelectOption[];
  placeholder?: string;
}

export function Select({ children, className, error, options, placeholder, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'min-h-11 w-full rounded-localo-md border border-localo-border bg-localo-surface px-3 text-base text-localo-text outline-none transition focus:border-localo-primary focus:ring-2 focus:ring-localo-primary/20 disabled:cursor-not-allowed disabled:bg-localo-surface-muted disabled:opacity-70 sm:text-sm',
        error && 'border-localo-danger focus:border-localo-danger focus:ring-localo-danger/20',
        className
      )}
      {...props}
    >
      {placeholder ? <option value="">{placeholder}</option> : null}
      {options?.map((option) => (
        <option disabled={option.disabled} key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
      {children}
    </select>
  );
}
