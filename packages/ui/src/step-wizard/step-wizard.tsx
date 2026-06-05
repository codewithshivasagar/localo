import { Icon } from '../icons';
import { cn } from '../utils/cn';
import type { StepWizardProps, StepWizardStatus, StepWizardStep } from './step-wizard.types';

const statusClasses: Record<StepWizardStatus, string> = {
  complete: 'border-localo-primary bg-localo-primary text-localo-primary-foreground',
  current: 'border-localo-primary bg-localo-primary/10 text-localo-primary',
  error: 'border-localo-danger bg-localo-danger/10 text-localo-danger',
  locked: 'border-localo-border bg-localo-surface-muted text-localo-text-muted',
  upcoming: 'border-localo-border bg-localo-surface text-localo-text-muted'
};

function canClickStep(step: StepWizardStep) {
  return step.status === 'complete' || step.status === 'current';
}

function StepMarker({ index, status }: { index: number; status: StepWizardStatus }) {
  if (status === 'complete') {
    return <Icon name="check" size="sm" tone="current" />;
  }

  if (status === 'error') {
    return <Icon name="alert" size="sm" tone="current" />;
  }

  if (status === 'locked') {
    return <Icon name="lock" size="sm" tone="current" />;
  }

  return <span className="text-sm font-bold">{index + 1}</span>;
}

export function StepWizard({
  className,
  currentStepId,
  onStepClick,
  steps,
  ...props
}: StepWizardProps) {
  return (
    <nav aria-label="Progress" className={cn('rounded-localo-2xl border border-localo-border bg-localo-surface p-3 shadow-localo-sm', className)} {...props}>
      <ol className="grid gap-3 md:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
        {steps.map((step, index) => {
          const isCurrent = step.id === currentStepId || step.status === 'current';
          const isClickable = Boolean(onStepClick && canClickStep(step));
          const marker = (
            <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full border', statusClasses[step.status])}>
              <StepMarker index={index} status={step.status} />
            </span>
          );
          const content = (
            <>
              {marker}
              <span className="min-w-0 text-left">
                <span className={cn('block text-sm font-bold text-localo-text', isCurrent && 'text-localo-primary')}>
                  {step.title}
                  {step.optional ? <span className="ml-1 font-medium text-localo-text-muted">(optional)</span> : null}
                </span>
                {step.description ? (
                  <span className="mt-0.5 block text-xs leading-5 text-localo-text-muted">{step.description}</span>
                ) : null}
              </span>
            </>
          );

          return (
            <li key={step.id}>
              {isClickable ? (
                <button
                  aria-current={isCurrent ? 'step' : undefined}
                  className="flex min-h-14 w-full touch-manipulation items-center gap-3 rounded-localo-xl px-3 py-2 transition hover:bg-localo-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-localo-primary/30"
                  onClick={() => onStepClick?.(step.id)}
                  type="button"
                >
                  {content}
                </button>
              ) : (
                <div
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-disabled={step.status === 'locked' ? true : undefined}
                  className="flex min-h-14 items-center gap-3 rounded-localo-xl px-3 py-2"
                >
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
