import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
}

export function Switch({ className, label, ...props }: SwitchProps) {
  return (
    <label className={cn('relative inline-flex min-h-11 touch-manipulation items-center gap-3 text-sm font-medium text-localo-text', className)}>
      <input className="peer sr-only" type="checkbox" {...props} />
      <span className="h-7 w-12 rounded-localo-full bg-localo-border transition peer-checked:bg-localo-primary peer-focus-visible:ring-2 peer-focus-visible:ring-localo-primary peer-focus-visible:ring-offset-2" />
      <span className="pointer-events-none absolute left-1 h-5 w-5 rounded-localo-full bg-white shadow-localo-sm transition peer-checked:translate-x-5" />
      {label ? <span>{label}</span> : null}
    </label>
  );
}
