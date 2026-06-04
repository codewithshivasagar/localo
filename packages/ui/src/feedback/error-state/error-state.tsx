import type { ReactNode } from 'react';
import { Alert } from '../alert';

export interface ErrorStateProps {
  action?: ReactNode;
  description?: ReactNode;
  title?: ReactNode;
}

export function ErrorState({ action, description = 'Something went wrong. Please try again.', title = 'Unable to continue' }: ErrorStateProps) {
  return (
    <Alert description={description} title={title} variant="danger">
      {action ? <div className="mt-4">{action}</div> : null}
    </Alert>
  );
}
