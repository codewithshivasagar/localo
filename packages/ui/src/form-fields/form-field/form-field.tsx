import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  description?: ReactNode;
  error?: ReactNode;
  helpText?: ReactNode;
  htmlFor?: string;
  label?: ReactNode;
  required?: boolean;
}

export function FormField({
  children,
  className,
  description,
  error,
  helpText,
  htmlFor,
  label,
  required,
  ...props
}: FormFieldProps) {
  const helperContent = description ?? helpText;

  return (
    <div className={cn('space-y-2.5', className)} {...props}>
      {label ? (
        <label className="block text-sm font-bold text-localo-text" htmlFor={htmlFor}>
          {label}
          {required ? <span aria-hidden="true" className="ml-1 text-localo-danger">*</span> : null}
        </label>
      ) : null}
      {children}
      {helperContent && !error ? <p className="text-sm leading-5 text-localo-text-muted">{helperContent}</p> : null}
      {error ? <p className="text-sm font-semibold leading-5 text-localo-danger">{error}</p> : null}
    </div>
  );
}
