import { Input, Textarea } from '@localo/ui';
import type { CreateShopFormState } from '../schemas';
import { createSlug, shopSlugRegex } from '../schemas';

interface StepProps {
  form: CreateShopFormState;
  updateField: <TKey extends keyof CreateShopFormState>(key: TKey, value: CreateShopFormState[TKey]) => void;
}

export function CreateShopBasicInfoStep({ form, updateField }: StepProps) {
  const slugValid = shopSlugRegex.test(form.slug);

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-bold text-localo-text" htmlFor="shop-name">Shop Name *</label>
        <Input id="shop-name" onChange={(event) => {
          updateField('name', event.target.value);
          if (!form.slug || form.slug === createSlug(form.name)) {
            updateField('slug', createSlug(event.target.value));
          }
        }} placeholder="Greenleaf Store" value={form.name} />
      </div>
      <div>
        <label className="text-sm font-bold text-localo-text" htmlFor="shop-slug">Slug *</label>
        <Input error={Boolean(form.slug && !slugValid)} id="shop-slug" leftAddon="/shops/" onChange={(event) => updateField('slug', event.target.value)} placeholder="greenleaf-store" value={form.slug} />
        <p className={slugValid || !form.slug ? 'mt-2 text-sm text-localo-text-muted' : 'mt-2 text-sm text-localo-danger'}>
          Only lowercase a-z, numbers, and hyphens. Preview: /shops/{form.slug || 'your-shop'}
        </p>
      </div>
      <div>
        <label className="text-sm font-bold text-localo-text" htmlFor="short-description">Short Description</label>
        <Textarea id="short-description" onChange={(event) => updateField('shortDescription', event.target.value)} placeholder="Briefly describe what your shop offers." rows={3} value={form.shortDescription} />
      </div>
      <div>
        <label className="text-sm font-bold text-localo-text" htmlFor="full-description">Full Description</label>
        <Textarea id="full-description" onChange={(event) => updateField('fullDescription', event.target.value)} placeholder="Share your shop story, products, and what makes it unique." rows={5} value={form.fullDescription} />
      </div>
    </div>
  );
}
