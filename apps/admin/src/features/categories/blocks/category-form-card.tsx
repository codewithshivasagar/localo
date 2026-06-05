'use client';

import type { ChangeEvent } from 'react';
import {
  Alert,
  Card,
  FormField,
  Icon,
  Input,
  NumberInput,
  Radio,
  Select,
  Switch,
  Textarea
} from '@localo/ui';
import type { SelectOption } from '@localo/ui';
import type { CategoryResponse } from '@localo/api-client';
import type { IconName } from '@localo/ui';
import type { CategoryFormState } from '../schemas';
import { categorySlugRegex } from '../schemas';
import { CategoryMediaSelector } from './category-media-selector';
import type { UseCategoryVisualMediaResult } from '../hooks';

interface CategoryFormCardProps {
  form: CategoryFormState;
  isLoadingParentOptions: boolean;
  category?: CategoryResponse | null;
  onUpdateField: <TKey extends keyof CategoryFormState>(key: TKey, value: CategoryFormState[TKey]) => void;
  parentCategories: CategoryResponse[];
  visualMediaState: UseCategoryVisualMediaResult;
}

const CATEGORY_ICON_OPTIONS: readonly { label: string; name: IconName }[] = [
  { label: 'Shopping', name: 'shoppingBasket' },
  { label: 'Store', name: 'store' },
  { label: 'Food', name: 'utensils' },
  { label: 'Fashion', name: 'shirt' },
  { label: 'Books', name: 'book' },
  { label: 'Electronics', name: 'laptop' },
  { label: 'Sparkles', name: 'sparkles' },
  { label: 'Home', name: 'home' },
  { label: 'Heart', name: 'heart' },
  { label: 'Packages', name: 'package' },
  { label: 'Cars', name: 'car' },
  { label: 'Beauty', name: 'scissors' },
  { label: 'Fitness', name: 'dumbbell' },
  { label: 'Kids', name: 'baby' },
  { label: 'Gifts', name: 'gift' },
  { label: 'Nature', name: 'leaf' },
  { label: 'Coffee', name: 'coffee' },
  { label: 'Photography', name: 'camera' },
  { label: 'Mobile', name: 'smartphone' },
  { label: 'Lifestyle', name: 'sofa' }
] as const;

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
  category,
  form,
  isLoadingParentOptions,
  onUpdateField,
  parentCategories,
  visualMediaState
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
              Choose a built-in icon for now or select a reusable media visual tagged as <span className="font-semibold text-localo-text">category-image</span>.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Radio
              checked={form.visualMode === 'icon'}
              label="Built-in Icon"
              onChange={() => onUpdateField('visualMode', 'icon')}
              name="category-visual-mode"
              value="icon"
            />
            <Radio
              checked={form.visualMode === 'media'}
              label="Media Image"
              onChange={() => onUpdateField('visualMode', 'media')}
              name="category-visual-mode"
              value="media"
            />
          </div>

          {form.visualMode === 'icon' ? (
            <div className="space-y-4">
              <Alert
                description="Built-in icon support will be persisted after backend visual fields are added."
                title="Built-in icon is local-only"
                variant="info"
              />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {CATEGORY_ICON_OPTIONS.map((option) => {
                  const isSelected = form.visualIconName === option.name;

                  return (
                    <button
                      className={[
                        'flex min-h-24 flex-col items-center justify-center gap-2 rounded-localo-xl border px-3 py-3 text-center transition',
                        isSelected
                          ? 'border-localo-primary bg-localo-primary/10 shadow-localo-sm shadow-localo-primary/10'
                          : 'border-localo-border bg-localo-surface hover:bg-localo-surface-muted'
                      ].join(' ')}
                      key={option.name}
                      onClick={() => onUpdateField('visualIconName', option.name)}
                      type="button"
                    >
                      <Icon bg="none" name={option.name} size="lg" tone={isSelected ? 'primary' : 'muted'} />
                      <span className="text-xs font-bold text-localo-text">{option.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="rounded-localo-xl border border-localo-border bg-localo-surface-muted p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-localo-primary">Selected icon preview</p>
                <div className="mt-3 flex items-center gap-3">
                  <Icon bg="primary" name={form.visualIconName} shape="rounded" tone="white" wrapperSize="lg" />
                  <div>
                    <p className="font-semibold text-localo-text">{CATEGORY_ICON_OPTIONS.find((option) => option.name === form.visualIconName)?.label}</p>
                    <p className="text-sm text-localo-text-muted">Local-only preview until backend icon fields are added.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Alert
                description="Upload reusable category visuals in Media Manager and tag them as category-image."
                title="Media image selection"
                variant="info"
              />
              <CategoryMediaSelector
                error={visualMediaState.error}
                isApiAvailable={visualMediaState.isApiAvailable}
                isLoading={visualMediaState.isLoading}
                media={visualMediaState.media}
                onClearSelection={() => {
                  onUpdateField('iconMediaId', '');
                  onUpdateField('imageMediaId', '');
                }}
                onRefresh={visualMediaState.refresh}
                onSearchChange={visualMediaState.setSearch}
                onSelectMedia={(media) => {
                  onUpdateField('visualMode', 'media');
                  onUpdateField('iconMediaId', '');
                  onUpdateField('imageMediaId', media.id);
                }}
                search={visualMediaState.search}
                selectedMedia={visualMediaState.selectedMedia}
              />
            </div>
          )}
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
