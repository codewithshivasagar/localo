import type { HTMLAttributes } from 'react';

export type StepWizardStatus = 'complete' | 'current' | 'locked' | 'upcoming' | 'error';

export interface StepWizardStep {
  description?: string;
  id: string;
  optional?: boolean;
  status: StepWizardStatus;
  title: string;
}

export interface StepWizardProps extends HTMLAttributes<HTMLElement> {
  currentStepId?: string;
  onStepClick?: (stepId: string) => void;
  steps: StepWizardStep[];
}
