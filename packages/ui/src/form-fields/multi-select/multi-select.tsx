import type { SelectHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import type { SelectOption } from '../select/select';

export interface MultiSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'multiple'> {
  error?: boolean;
  options?: SelectOption[];
}

export function MultiSelect({ children, className, error, options, size = 5, ...props }: MultiSelectProps) {
  return (
    <select
      className={cn(
        'min-h-32 w-full rounded-localo-md border border-localo-border bg-localo-surface px-3 py-2 text-base text-localo-text outline-none transition focus:border-localo-primary focus:ring-2 focus:ring-localo-primary/20 disabled:cursor-not-allowed disabled:bg-localo-surface-muted disabled:opacity-70 sm:text-sm',
        error && 'border-localo-danger focus:border-localo-danger focus:ring-localo-danger/20',
        className
      )}
      multiple
      size={size}
      {...props}
    >
      {options?.map((option) => (
        <option disabled={option.disabled} key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
      {children}
    </select>
  );
}
