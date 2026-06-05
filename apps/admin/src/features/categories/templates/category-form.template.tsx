'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CategoryResponse } from '@localo/api-client';
import {
  Alert,
  Breadcrumbs,
  Button,
  ErrorState,
  Icon,
  LoadingState,
  PageContainer,
  PageHeader
} from '@localo/ui';
import { AdminRoutes } from '../../../config';
import { adminCategoryRoutes, adminCategoriesApi } from '../config';
import {
  createCategorySlug,
  initialCategoryFormState,
  isCategoryFormValid,
  toCategoryFormState,
  type CategoryFormState
} from '../schemas';
import { useAdminCategoryDetail, useCategoryParentOptions } from '../hooks';
import { useCategoryVisualMedia } from '../hooks';
import { CategoryFormActions } from '../blocks/category-form-actions';
import { CategoryFormCard } from '../blocks/category-form-card';
import { CategoryGuidelinesCard } from '../blocks/category-guidelines-card';
import { CategoryPreviewCard } from '../blocks/category-preview-card';
import { CategoryStatusCard } from '../blocks/category-status-card';

interface CategoryFormTemplateProps {
  categoryId?: string;
  isEditMode: boolean;
}

function toParentCategories(categories: CategoryResponse[], currentCategoryId?: string) {
  return categories.filter((category) => category.id !== currentCategoryId);
}

export function CategoryFormTemplate({ categoryId, isEditMode }: CategoryFormTemplateProps) {
  const router = useRouter();
  const { category, error: detailError, isLoading: isLoadingDetail, isRefreshing: isRefreshingDetail, refresh: refreshDetail } = useAdminCategoryDetail(categoryId ?? '');
  const { categories: parentCategories, error: parentCategoriesError, isLoading: isLoadingParentOptions } = useCategoryParentOptions();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<CategoryFormState>(initialCategoryFormState);
  const [slugTouched, setSlugTouched] = useState(false);
  const initializedCategoryIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isEditMode || !category) {
      return;
    }

    if (initializedCategoryIdRef.current === category.id) {
      return;
    }

    setForm(toCategoryFormState(category));
    setSlugTouched(true);
    initializedCategoryIdRef.current = category.id;
  }, [category, isEditMode]);

  function updateField<TKey extends keyof CategoryFormState>(key: TKey, value: CategoryFormState[TKey]) {
    setError(null);
    setForm((currentForm) => {
      const nextForm = { ...currentForm, [key]: value };

      if (key === 'name' && !slugTouched) {
        nextForm.slug = createCategorySlug(String(value));
      }

      if (key === 'slug') {
        setSlugTouched(true);
      }

      return nextForm;
    });
  }

  const parentOptions = useMemo(
    () => toParentCategories(parentCategories, categoryId),
    [categoryId, parentCategories]
  );

  const parentCategoryLabel = useMemo(
    () => parentOptions.find((item) => item.id === form.parentId)?.name,
    [form.parentId, parentOptions]
  );
  const selectedVisualMediaId = form.visualMode === 'media'
    ? form.imageMediaId || category?.imageMedia?.id || category?.iconMedia?.id || undefined
    : form.imageMediaId || category?.imageMedia?.id || category?.iconMedia?.id || undefined;
  const visualMediaState = useCategoryVisualMedia(selectedVisualMediaId);

  async function submit() {
    if (!isCategoryFormValid(form)) {
      setError('Please complete the required category fields before saving.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const payload = {
      description: form.description || undefined,
      iconMediaId: form.iconMediaId || undefined,
      imageMediaId: form.visualMode === 'media' ? form.imageMediaId || undefined : undefined,
      isActive: form.isActive,
      name: form.name.trim(),
      parentId: form.parentId || undefined,
      sortOrder: form.sortOrder ? Number(form.sortOrder) : undefined,
      slug: form.slug.trim()
    };

    try {
      if (isEditMode && categoryId) {
        await adminCategoriesApi.adminUpdate(categoryId, payload);
      } else {
        await adminCategoriesApi.adminCreate(payload);
      }

      router.push(adminCategoryRoutes.list);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Unable to save category. Please review the details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const pageTitle = isEditMode ? 'Edit Category' : 'Create Category';
  const pageDescription = isEditMode
    ? 'Update the category details, visibility, and hierarchy for the catalog.'
    : 'Add a new category to keep Localo catalog navigation organized.';

  return (
    <PageContainer className="space-y-6">
      <div className="space-y-3">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: AdminRoutes.Dashboard },
            { label: 'Categories', href: adminCategoryRoutes.list },
            { label: pageTitle, current: true }
          ]}
        />
        <PageHeader
          actions={
            <Button
              disabled={isSubmitting}
              isLoading={isSubmitting}
              leftIcon={<Icon name={isEditMode ? 'check' : 'plus'} size="sm" tone="current" />}
              onClick={() => void submit()}
              type="button"
              variant="primary"
            >
              {isEditMode ? 'Save Changes' : 'Create Category'}
            </Button>
          }
          description={pageDescription}
          eyebrow="Admin"
          title={pageTitle}
        />
      </div>

      {isEditMode && isLoadingDetail ? (
        <LoadingState description="Fetching category details." label="Loading category" />
      ) : detailError ? (
        <ErrorState
          action={
            <Button leftIcon={<Icon name="refresh" size="sm" tone="current" />} onClick={refreshDetail} type="button">
              Retry
            </Button>
          }
          description={detailError}
          title="Unable to load category details"
        />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-5">
            {error ? <Alert description={error} title="Category save blocked" variant="danger" /> : null}
            {parentCategoriesError ? (
              <Alert description={parentCategoriesError} title="Parent categories unavailable" variant="warning" />
            ) : null}
            {isRefreshingDetail ? (
              <Alert description="Refreshing category details." title="Updating..." variant="info" />
            ) : null}
            <CategoryFormCard
              category={category}
              form={form}
              isLoadingParentOptions={isLoadingParentOptions}
              onUpdateField={updateField}
              parentCategories={parentOptions}
              visualMediaState={visualMediaState}
            />
            <div className="rounded-localo-2xl border border-localo-border bg-localo-surface p-5 shadow-localo-sm">
              <CategoryFormActions
                categoryId={categoryId}
                isEditMode={isEditMode}
                isSubmitting={isSubmitting}
                onSubmit={() => void submit()}
              />
            </div>
          </div>

          <div className="space-y-4">
            <CategoryPreviewCard
              category={category}
              form={form}
              parentCategoryLabel={parentCategoryLabel}
              visualMedia={visualMediaState.selectedMedia}
            />
            <CategoryStatusCard form={form} parentCategoryLabel={parentCategoryLabel} />
            <CategoryGuidelinesCard />
          </div>
        </div>
      )}
    </PageContainer>
  );
}
