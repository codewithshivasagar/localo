'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import { Button } from '../button';
import { cn } from '../../utils/cn';

export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  closeLabel?: string;
  description?: ReactNode;
  footer?: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  title?: ReactNode;
}

export function Dialog({ children, className, closeLabel = 'Close', description, footer, isOpen, onClose, title, ...props }: DialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/35 p-3 sm:items-center sm:p-6" role="presentation">
      <section
        aria-modal="true"
        className={cn('max-h-[92dvh] w-full overflow-auto rounded-t-localo-xl border border-localo-border bg-localo-surface p-4 shadow-localo-lg sm:max-w-lg sm:rounded-localo-xl sm:p-6', className)}
        role="dialog"
        {...props}
      >
        <header className="mb-4 flex items-start justify-between gap-4">
          <div className="space-y-1">
            {title ? <h2 className="text-lg font-bold text-localo-text">{title}</h2> : null}
            {description ? <p className="text-sm leading-6 text-localo-text-muted">{description}</p> : null}
          </div>
          {onClose ? (
            <Button aria-label={closeLabel} onClick={onClose} size="icon" type="button" variant="ghost">
              ×
            </Button>
          ) : null}
        </header>
        <div>{children}</div>
        {footer ? <footer className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">{footer}</footer> : null}
      </section>
    </div>
  );
}

export function DialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-3 sm:flex-row sm:justify-end', className)} {...props} />;
}
