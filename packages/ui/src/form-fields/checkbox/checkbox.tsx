import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
}

export function Checkbox({ className, label, ...props }: CheckboxProps) {
  return (
    <label className={cn('inline-flex min-h-11 touch-manipulation items-center gap-3 text-sm font-medium text-localo-text', !label && 'min-h-0', className)}>
      <input
        className="h-5 w-5 rounded-localo-sm border-localo-border text-localo-primary focus:ring-localo-primary"
        type="checkbox"
        {...props}
      />
      {label ? <span>{label}</span> : null}
    </label>
  );
}
