'use client';

import type { ChangeEvent } from 'react';
import {
  Alert,
  Card,
  FormField,
  Icon,
  Input,
  NumberInput,
  Select,
  Switch,
  Textarea
} from '@localo/ui';
import type { SelectOption } from '@localo/ui';
import type { CategoryResponse } from '@localo/api-client';
import type { CategoryFormState } from '../schemas';
import { categorySlugRegex } from '../schemas';

interface CategoryFormCardProps {
  form: CategoryFormState;
  isLoadingParentOptions: boolean;
  onUpdateField: <TKey extends keyof CategoryFormState>(key: TKey, value: CategoryFormState[TKey]) => void;
  parentCategories: CategoryResponse[];
}

function createParentOptions(parentCategories: CategoryResponse[]): SelectOption[] {
  return [
    { label: 'No parent / Root category', value: '' },
    ...parentCategories.map((category) => ({
      label: `${category.name} (${category.slug})`,
      value: category.id
    }))
  ];
}

export function CategoryFormCard({
  form,
  isLoadingParentOptions,
  onUpdateField,
  parentCategories
}: CategoryFormCardProps) {
  return (
    <Card className="space-y-5" padding="lg">
      <div className="flex items-start gap-3">
        <Icon bg="primary" name="categories" shape="rounded" tone="white" wrapperSize="lg" />
        <div>
          <h2 className="text-xl font-black text-localo-text">Category Details</h2>
          <p className="mt-1 text-sm leading-6 text-localo-text-muted">
            Configure the name, slug, parent, visibility, and display order for this category.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <section className="space-y-4 rounded-localo-2xl border border-localo-border bg-localo-surface p-4 sm:p-5">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-localo-primary">Basic Information</h3>
            <p className="mt-1 text-sm text-localo-text-muted">Name, slug, and description that define the category identity.</p>
          </div>
          <div className="grid gap-4">
            <FormField description="Use a human-friendly name customers and admins can understand." label="Category Name" required>
              <Input
                autoComplete="off"
                onChange={(event) => onUpdateField('name', event.target.value)}
                placeholder="e.g. Grocery"
                value={form.name}
              />
            </FormField>

            <FormField
              description="Lowercase letters, numbers, and hyphens only."
              error={form.slug && !categorySlugRegex.test(form.slug) ? 'Slug must contain only lowercase letters, numbers, and hyphens.' : undefined}
              label="Slug"
              required
            >
              <Input
                autoComplete="off"
                onChange={(event) => onUpdateField('slug', event.target.value)}
                placeholder="e.g. grocery"
                value={form.slug}
              />
            </FormField>

            <FormField description="Optional short note about the category purpose." label="Description">
              <Textarea
                onChange={(event) => onUpdateField('description', event.target.value)}
                placeholder="Brief description of this category..."
                rows={4}
                value={form.description}
              />
            </FormField>
          </div>
        </section>

        <section className="space-y-4 rounded-localo-2xl border border-localo-border bg-localo-surface p-4 sm:p-5">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-localo-primary">Icon &amp; Visual Identity</h3>
            <p className="mt-1 text-sm text-localo-text-muted">
              Existing backend support is limited to media IDs, so upload and asset selection will come later.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField description="Optional icon media ID. Used when backend returns existing category visuals." label="Icon Media ID">
              <Input
                autoComplete="off"
                onChange={(event) => onUpdateField('iconMediaId', event.target.value)}
                placeholder="Media UUID"
                value={form.iconMediaId}
              />
            </FormField>

            <FormField description="Optional image media ID for category artwork." label="Image Media ID">
              <Input
                autoComplete="off"
                onChange={(event) => onUpdateField('imageMediaId', event.target.value)}
                placeholder="Media UUID"
                value={form.imageMediaId}
              />
            </FormField>
          </div>
        </section>

        <section className="space-y-4 rounded-localo-2xl border border-localo-border bg-localo-surface p-4 sm:p-5">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-localo-primary">Hierarchy &amp; Ordering</h3>
            <p className="mt-1 text-sm text-localo-text-muted">Choose a parent category and display order. Lower numbers appear first.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField description="Choose a parent if this category should live under another category." label="Parent Category">
              <Select
                disabled={isLoadingParentOptions}
                onChange={(event) => onUpdateField('parentId', event.target.value)}
                options={createParentOptions(parentCategories)}
                value={form.parentId}
              />
            </FormField>

            <FormField
              description="Lower numbers appear first in listings and navigation."
              label="Sort Order"
            >
              <NumberInput
                min={0}
                onChange={(event: ChangeEvent<HTMLInputElement>) => onUpdateField('sortOrder', event.target.value)}
                placeholder="0"
                value={form.sortOrder}
              />
            </FormField>
          </div>
        </section>

        <section className="space-y-4 rounded-localo-2xl border border-localo-border bg-localo-surface p-4 sm:p-5">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-localo-primary">Visibility &amp; Status</h3>
            <p className="mt-1 text-sm text-localo-text-muted">Hide or show the category without deleting it.</p>
          </div>
          <FormField description="Active categories appear in admin navigation and public category browsing." label="Status">
            <Switch
              checked={form.isActive}
              onChange={(event) => onUpdateField('isActive', event.target.checked)}
              label={form.isActive ? 'Active' : 'Inactive'}
            />
          </FormField>
          <Alert
            description="Category media wiring uses existing media IDs only. Upload and asset management will come later."
            variant="info"
          />
        </section>
      </div>
    </Card>
  );
}
