'use client';

import type { ReactNode } from 'react';
import { Button } from '../../primitives/button';
import { Dialog, DialogFooter } from '../../primitives/dialog';

export interface ConfirmDialogProps {
  cancelLabel?: ReactNode;
  confirmLabel?: ReactNode;
  description?: ReactNode;
  isOpen: boolean;
  isPending?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  title?: ReactNode;
  variant?: 'primary' | 'destructive';
}

export function ConfirmDialog({
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  description,
  isOpen,
  isPending,
  onCancel,
  onConfirm,
  title = 'Confirm action',
  variant = 'primary'
}: ConfirmDialogProps) {
  return (
    <Dialog description={description} isOpen={isOpen} onClose={onCancel} title={title}>
      <DialogFooter className="mt-5">
        <Button fullWidth onClick={onCancel} type="button" variant="outline">
          {cancelLabel}
        </Button>
        <Button fullWidth isLoading={isPending} onClick={onConfirm} type="button" variant={variant === 'destructive' ? 'destructive' : 'primary'}>
          {confirmLabel}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
