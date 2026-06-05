import Link from 'next/link';
import { Button, Icon } from '@localo/ui';
import { adminShopRoutes } from '../config';

interface CreateShopFormActionsProps {
  canGoBack: boolean;
  canGoNext: boolean;
  isFinalStep: boolean;
  isPaymentStep: boolean;
  onBack: () => void;
  onNext: () => void;
  onSkipPayment: () => void;
}

export function CreateShopFormActions({
  canGoBack,
  canGoNext,
  isFinalStep,
  isPaymentStep,
  onBack,
  onNext,
  onSkipPayment
}: CreateShopFormActionsProps) {
  return (
    <div className="mt-8 flex flex-col gap-3 border-t border-localo-border pt-5 sm:flex-row sm:justify-between">
      <Button disabled={!canGoBack} leftIcon={<Icon name="chevronLeft" size="sm" tone="current" />} onClick={onBack} type="button" variant="outline">
        Back
      </Button>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link className="inline-flex min-h-11 items-center justify-center rounded-localo-lg border border-localo-border bg-localo-surface px-5 text-sm font-semibold text-localo-text shadow-localo-sm hover:bg-localo-surface-muted" href={adminShopRoutes.list}>
          Cancel
        </Link>
        {isPaymentStep ? (
          <Button onClick={onSkipPayment} type="button" variant="outline">
            Skip for Now
          </Button>
        ) : null}
        <Button disabled={!canGoNext} onClick={onNext} rightIcon={<Icon name={isFinalStep ? 'check' : 'chevronRight'} size="sm" tone="current" />} type="button">
          {isFinalStep ? 'Create Shop' : 'Next Step'}
        </Button>
      </div>
    </div>
  );
}
