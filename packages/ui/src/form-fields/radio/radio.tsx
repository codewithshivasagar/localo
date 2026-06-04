import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
}

export function Radio({ className, label, ...props }: RadioProps) {
  return (
    <label className={cn('inline-flex min-h-11 touch-manipulation items-center gap-3 text-sm font-medium text-localo-text', className)}>
      <input className="h-5 w-5 border-localo-border text-localo-primary focus:ring-localo-primary" type="radio" {...props} />
      {label ? <span>{label}</span> : null}
    </label>
  );
}
