import { Badge, Card, Icon, Input, Select, Switch } from '@localo/ui';
import type { CreateShopFormState } from '../schemas';

interface StepProps {
  form: CreateShopFormState;
  updateField: <TKey extends keyof CreateShopFormState>(key: TKey, value: CreateShopFormState[TKey]) => void;
}

const categoryOptions = [
  { label: 'Select category', value: '' },
  { label: 'Grocery', value: 'grocery' },
  { label: 'Food & Dining', value: 'food-dining' },
  { label: 'Health & Wellness', value: 'health-wellness' }
];

export function CreateShopCategoryStep({ form, updateField }: StepProps) {
  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-bold text-localo-text" htmlFor="category">Primary Category *</label>
        <Select id="category" onChange={(event) => updateField('categoryId', event.target.value)} options={categoryOptions} value={form.categoryId} />
        <p className="mt-2 text-sm text-localo-text-muted">TODO: replace shell options with category API data including iconName/iconUrl/svgUrl.</p>
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
            <Switch defaultChecked={index !== 2} />
          </div>
        ))}
      </Card>
    </div>
  );
}
