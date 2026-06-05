import { Card, Icon } from '@localo/ui';
import type { CategoryResponse } from '@localo/api-client';
import type { CategoryFormState } from '../schemas';

interface CategoryPreviewCardProps {
  category?: CategoryResponse | null;
  form: CategoryFormState;
  parentCategoryLabel?: string;
}

export function CategoryPreviewCard({ category, form, parentCategoryLabel }: CategoryPreviewCardProps) {
  const slugPath = form.slug ? `/categories/${form.slug}` : '/categories/category-slug';
  const visualUrl = category?.iconMedia?.publicUrl ?? category?.imageMedia?.publicUrl ?? null;
  const visualAlt = category?.iconMedia?.altText ?? category?.imageMedia?.altText ?? form.name ?? 'Category visual';

  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-3">
        {visualUrl ? (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-localo-full border border-localo-border bg-localo-surface">
            <img alt={visualAlt} className="h-full w-full object-cover" src={visualUrl} />
          </span>
        ) : (
          <Icon bg="primary" name="categories" shape="circle" tone="white" wrapperSize={44} />
        )}
        <div>
          <h3 className="text-lg font-bold text-localo-text">Live Preview</h3>
          <p className="text-sm text-localo-text-muted">How this category will read in Localo</p>
        </div>
      </div>
      <div className="rounded-localo-xl border border-localo-border bg-localo-surface-muted/60 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-localo-primary">Category path</p>
        <p className="mt-2 text-lg font-black text-localo-text">{form.name || 'Category name'}</p>
        <p className="mt-1 text-sm text-localo-text-muted">{slugPath}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-localo-primary/10 px-3 py-1 text-xs font-bold text-localo-primary">
            {form.isActive ? 'Active' : 'Inactive'}
          </span>
          <span className="rounded-full bg-localo-surface px-3 py-1 text-xs font-bold text-localo-text-muted">
            {parentCategoryLabel ?? 'Root category'}
          </span>
          <span className="rounded-full bg-localo-surface px-3 py-1 text-xs font-bold text-localo-text-muted">
            {form.sortOrder || '0'}
          </span>
        </div>
      </div>
      <p className="text-sm leading-6 text-localo-text-muted">
        Keep the name short, the slug stable, and the hierarchy simple for future catalog navigation.
      </p>
    </Card>
  );
}
