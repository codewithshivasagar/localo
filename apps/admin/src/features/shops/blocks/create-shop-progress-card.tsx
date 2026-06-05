import { Card, Icon } from '@localo/ui';
import { createShopSteps, type CreateShopStepId } from '../config';

interface CreateShopProgressCardProps {
  completedStepIds: Set<CreateShopStepId>;
  currentStepId: CreateShopStepId;
}

export function CreateShopProgressCard({ completedStepIds, currentStepId }: CreateShopProgressCardProps) {
  const currentIndex = createShopSteps.findIndex((step) => step.id === currentStepId);

  return (
    <div className="space-y-5">
      <Card className="sticky top-24">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-localo-text">Setup Progress</h2>
          <span className="rounded-full border-4 border-localo-primary/20 bg-localo-primary/5 px-3 py-2 text-sm font-black text-localo-primary">
            {currentIndex + 1}/6
          </span>
        </div>
        <div className="mt-5 space-y-1">
          {createShopSteps.map((step, index) => {
            const isDone = completedStepIds.has(step.id);
            const isCurrent = step.id === currentStepId;

            return (
              <div className="flex items-center gap-3 border-b border-localo-border py-3 last:border-0" key={step.id}>
                <span className={isDone || isCurrent ? 'flex h-8 w-8 items-center justify-center rounded-full bg-localo-primary text-xs font-black text-white' : 'flex h-8 w-8 items-center justify-center rounded-full border border-localo-border bg-localo-surface-muted text-xs font-black text-localo-text-muted'}>
                  {isDone ? <Icon name="check" size="xs" tone="white" /> : index + 1}
                </span>
                <span className={isCurrent ? 'font-bold text-localo-primary' : 'font-semibold text-localo-text'}>
                  {step.title}{step.optional ? ' (Optional)' : ''}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
      <Card>
        <div className="flex gap-3">
          <Icon bg="success" name="note" shape="rounded" tone="primary" wrapperSize="lg" />
          <div>
            <h2 className="font-bold text-localo-text">Creation Notes</h2>
            <p className="mt-3 text-sm leading-6 text-localo-text-muted">
              This shell captures the setup flow only. API creation, owner assignment, and product setup come in later UI phases.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
