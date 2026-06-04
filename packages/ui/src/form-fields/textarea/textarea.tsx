import type { TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({ className, error, rows = 4, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'min-h-28 w-full rounded-localo-md border border-localo-border bg-localo-surface px-3 py-3 text-base text-localo-text outline-none transition placeholder:text-localo-text-muted focus:border-localo-primary focus:ring-2 focus:ring-localo-primary/20 disabled:cursor-not-allowed disabled:bg-localo-surface-muted disabled:opacity-70 sm:text-sm',
        error && 'border-localo-danger focus:border-localo-danger focus:ring-localo-danger/20',
        className
      )}
      rows={rows}
      {...props}
    />
  );
}
