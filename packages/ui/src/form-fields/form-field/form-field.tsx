import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  error?: ReactNode;
  helpText?: ReactNode;
  label?: ReactNode;
  required?: boolean;
}

export function FormField({ children, className, error, helpText, label, required, ...props }: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {label ? (
        <label className="block text-sm font-semibold text-localo-text">
          {label}
          {required ? <span className="ml-1 text-localo-danger">*</span> : null}
        </label>
      ) : null}
      {children}
      {helpText && !error ? <p className="text-sm leading-5 text-localo-text-muted">{helpText}</p> : null}
      {error ? <p className="text-sm font-medium leading-5 text-localo-danger">{error}</p> : null}
    </div>
  );
}
