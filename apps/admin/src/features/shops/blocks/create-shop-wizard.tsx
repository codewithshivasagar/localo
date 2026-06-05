'use client';

import { useMemo, useState } from 'react';
import { Card, StepWizard } from '@localo/ui';
import type { StepWizardStatus } from '@localo/ui';
import { createShopStepIds, createShopSteps, type CreateShopStepId } from '../config';
import {
  initialCreateShopFormState,
  isCreateShopStepValid,
  type CreateShopFormState
} from '../schemas';
import { CreateShopBasicInfoStep } from './create-shop-basic-info-step';
import { CreateShopCategoryStep } from './create-shop-category-step';
import { CreateShopContactStep } from './create-shop-contact-step';
import { CreateShopFormActions } from './create-shop-form-actions';
import { CreateShopLocationStep } from './create-shop-location-step';
import { CreateShopPaymentStep } from './create-shop-payment-step';
import { CreateShopProgressCard } from './create-shop-progress-card';
import { CreateShopReviewStep } from './create-shop-review-step';

const stepOrder = createShopSteps.map((step) => step.id);

function resolveStepStatus(stepId: CreateShopStepId, currentStepId: CreateShopStepId, completedStepIds: Set<CreateShopStepId>): StepWizardStatus {
  if (stepId === currentStepId) {
    return 'current';
  }

  if (completedStepIds.has(stepId)) {
    return 'complete';
  }

  return 'locked';
}

export function CreateShopWizard() {
  const [completedStepIds, setCompletedStepIds] = useState<Set<CreateShopStepId>>(new Set());
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [form, setForm] = useState<CreateShopFormState>(initialCreateShopFormState);
  const currentStepId = stepOrder[currentStepIndex];
  const isFinalStep = currentStepId === createShopStepIds.review;
  const isPaymentStep = currentStepId === createShopStepIds.payment;
  const canGoNext = isCreateShopStepValid(currentStepId, form);

  const wizardSteps = useMemo(
    () =>
      createShopSteps.map((step) => ({
        ...step,
        status: resolveStepStatus(step.id, currentStepId, completedStepIds)
      })),
    [completedStepIds, currentStepId]
  );

  function updateField<TKey extends keyof CreateShopFormState>(key: TKey, value: CreateShopFormState[TKey]) {
    setForm((currentForm) => ({ ...currentForm, [key]: value }));
  }

  function goToStep(index: number) {
    setCurrentStepIndex(Math.max(0, Math.min(index, stepOrder.length - 1)));
  }

  function goNext() {
    if (!canGoNext) {
      return;
    }

    setCompletedStepIds((current) => new Set(current).add(currentStepId));

    if (!isFinalStep) {
      goToStep(currentStepIndex + 1);
    }
  }

  function skipPayment() {
    setCompletedStepIds((current) => new Set(current).add(createShopStepIds.payment));
    goToStep(currentStepIndex + 1);
  }

  function renderStep() {
    if (currentStepId === createShopStepIds.basicInfo) {
      return <CreateShopBasicInfoStep form={form} updateField={updateField} />;
    }

    if (currentStepId === createShopStepIds.contact) {
      return <CreateShopContactStep form={form} updateField={updateField} />;
    }

    if (currentStepId === createShopStepIds.category) {
      return <CreateShopCategoryStep form={form} updateField={updateField} />;
    }

    if (currentStepId === createShopStepIds.location) {
      return <CreateShopLocationStep form={form} updateField={updateField} />;
    }

    if (currentStepId === createShopStepIds.payment) {
      return <CreateShopPaymentStep form={form} updateField={updateField} />;
    }

    return <CreateShopReviewStep form={form} onEditStep={goToStep} />;
  }

  return (
    <div className="space-y-6">
      <StepWizard
        currentStepId={currentStepId}
        onStepClick={(stepId) => goToStep(stepOrder.indexOf(stepId as CreateShopStepId))}
        steps={wizardSteps}
      />
      <div className="grid gap-6 xl:grid-cols-[1fr,24rem]">
        <Card padding="lg">
          {renderStep()}
          <CreateShopFormActions
            canGoBack={currentStepIndex > 0}
            canGoNext={canGoNext}
            isFinalStep={isFinalStep}
            isPaymentStep={isPaymentStep}
            onBack={() => goToStep(currentStepIndex - 1)}
            onNext={goNext}
            onSkipPayment={skipPayment}
          />
        </Card>
        <CreateShopProgressCard completedStepIds={completedStepIds} currentStepId={currentStepId} />
      </div>
    </div>
  );
}
