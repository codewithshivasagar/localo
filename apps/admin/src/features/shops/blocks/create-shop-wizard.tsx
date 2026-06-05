'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CreateShopRequest } from '@localo/api-client';
import { Alert, Card, StepWizard } from '@localo/ui';
import type { StepWizardStatus } from '@localo/ui';
import { adminShopRoutes, adminShopsApi, createShopStepIds, createShopSteps, type CreateShopStepId } from '../config';
import {
  initialCreateShopFormState,
  isCreateShopFormReadyForSubmit,
  isCreateShopStepValid,
  type CreateShopFormState
} from '../schemas';
import { useCreateShopCategories } from '../hooks';
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
  const router = useRouter();
  const { categories, error: categoriesError, isLoading: isLoadingCategories } = useCreateShopCategories();
  const [completedStepIds, setCompletedStepIds] = useState<Set<CreateShopStepId>>(new Set());
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [form, setForm] = useState<CreateShopFormState>(initialCreateShopFormState);
  const currentStepId = stepOrder[currentStepIndex];
  const isFinalStep = currentStepId === createShopStepIds.review;
  const isPaymentStep = currentStepId === createShopStepIds.payment;
  const canGoNext = isFinalStep ? isCreateShopFormReadyForSubmit(form) : isCreateShopStepValid(currentStepId, form);

  const wizardSteps = useMemo(
    () =>
      createShopSteps.map((step) => ({
        ...step,
        status: resolveStepStatus(step.id, currentStepId, completedStepIds)
      })),
    [completedStepIds, currentStepId]
  );

  function updateField<TKey extends keyof CreateShopFormState>(key: TKey, value: CreateShopFormState[TKey]) {
    setSubmitError(null);
    setForm((currentForm) => ({ ...currentForm, [key]: value }));
  }

  function goToStep(index: number) {
    setCurrentStepIndex(Math.max(0, Math.min(index, stepOrder.length - 1)));
  }

  function buildCreatePayload(): CreateShopRequest {
    return {
      description: form.fullDescription || form.shortDescription || undefined,
      email: form.email || undefined,
      isFeatured: form.isFeatured,
      name: form.name.trim(),
      ownerUserId: form.ownerUserId,
      phone: form.phone || undefined,
      primaryCategoryId: form.categoryId || undefined,
      slug: form.slug,
      websiteUrl: form.website || undefined
    };
  }

  async function submitCreateShop() {
    if (!isCreateShopFormReadyForSubmit(form)) {
      setSubmitError('Owner assignment is required by the backend create API. Add owner selection in the next integration step before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const createdShop = await adminShopsApi.adminCreate(buildCreatePayload());
      router.push(adminShopRoutes.detail(createdShop.id));
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to create shop. Please review the details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function goNext() {
    if (!canGoNext) {
      if (isFinalStep) {
        setSubmitError('Please complete all required setup details before creating the shop.');
      }
      return;
    }

    setCompletedStepIds((current) => new Set(current).add(currentStepId));

    if (isFinalStep) {
      void submitCreateShop();
      return;
    }

    goToStep(currentStepIndex + 1);
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
      return (
        <CreateShopCategoryStep
          categories={categories}
          categoriesError={categoriesError}
          form={form}
          isLoadingCategories={isLoadingCategories}
          updateField={updateField}
        />
      );
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
          {submitError ? (
            <Alert className="mb-5" description={submitError} title="Create shop blocked" variant="danger" />
          ) : null}
          {renderStep()}
          <CreateShopFormActions
            canGoBack={currentStepIndex > 0}
            canGoNext={canGoNext}
            isFinalStep={isFinalStep}
            isPaymentStep={isPaymentStep}
            isSubmitting={isSubmitting}
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
