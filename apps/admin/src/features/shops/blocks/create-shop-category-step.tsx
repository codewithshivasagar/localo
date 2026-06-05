import { Badge, Card, Icon, Input, Select, Switch } from '@localo/ui';
import type { CategoryResponse } from '@localo/api-client';
import type { CreateShopFormState } from '../schemas';

interface StepProps {
  categories: CategoryResponse[];
  categoriesError?: string | null;
  form: CreateShopFormState;
  isLoadingCategories?: boolean;
  updateField: <TKey extends keyof CreateShopFormState>(key: TKey, value: CreateShopFormState[TKey]) => void;
}

export function CreateShopCategoryStep({
  categories,
  categoriesError,
  form,
  isLoadingCategories,
  updateField
}: StepProps) {
  const categoryOptions = [
    { label: isLoadingCategories ? 'Loading categories...' : 'Select category', value: '' },
    ...categories.map((category) => ({ label: category.name, value: category.id }))
  ];

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-bold text-localo-text" htmlFor="category">Primary Category *</label>
        <Select disabled={isLoadingCategories} id="category" onChange={(event) => updateField('categoryId', event.target.value)} options={categoryOptions} value={form.categoryId} />
        {categoriesError ? (
          <p className="mt-2 text-sm text-localo-danger">{categoriesError}</p>
        ) : (
          <p className="mt-2 text-sm text-localo-text-muted">Categories load from the backend. Icon media is shown later when available in category responses.</p>
        )}
      </div>
      <div>
        <label className="text-sm font-bold text-localo-text" htmlFor="tags">Tags</label>
        <Input id="tags" onChange={(event) => updateField('tags', event.target.value)} placeholder="organic, daily-needs, eco-friendly" value={form.tags} />
        <div className="mt-3 flex flex-wrap gap-2">
          {form.tags.split(',').map((tag) => tag.trim()).filter(Boolean).map((tag) => <Badge key={tag} variant="success">{tag}</Badge>)}
        </div>
      </div>
      <Card className="space-y-4" variant="subtle">
        {['Featured listing', 'Search visibility', 'In-app discovery', 'Promo eligibility'].map((label, index) => (
          <div className="flex items-center justify-between gap-4" key={label}>
            <div className="flex items-center gap-3">
              <Icon bg="success" name={index === 0 ? 'star' : 'search'} shape="circle" tone="primary" wrapperSize="lg" />
              <span className="font-semibold text-localo-text">{label}</span>
            </div>
            <Switch checked={index === 0 ? form.isFeatured : index !== 2} onChange={(event) => {
              if (index === 0) {
                updateField('isFeatured', event.target.checked);
              }
            }} />
          </div>
        ))}
      </Card>
    </div>
  );
}
