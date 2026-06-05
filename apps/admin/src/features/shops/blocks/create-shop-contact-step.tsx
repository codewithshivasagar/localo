import { EmailInput, Input } from '@localo/ui';
import type { CreateShopFormState } from '../schemas';

interface StepProps {
  form: CreateShopFormState;
  updateField: <TKey extends keyof CreateShopFormState>(key: TKey, value: CreateShopFormState[TKey]) => void;
}

export function CreateShopContactStep({ form, updateField }: StepProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="text-sm font-bold text-localo-text" htmlFor="phone">Phone *</label>
        <Input id="phone" onChange={(event) => updateField('phone', event.target.value)} placeholder="+91 98765 43210" value={form.phone} />
      </div>
      <div>
        <label className="text-sm font-bold text-localo-text" htmlFor="email">Email</label>
        <EmailInput id="email" onChange={(event) => updateField('email', event.target.value)} placeholder="hello@example.com" value={form.email} />
      </div>
      <div>
        <label className="text-sm font-bold text-localo-text" htmlFor="website">Website</label>
        <Input id="website" onChange={(event) => updateField('website', event.target.value)} placeholder="https://example.com" value={form.website} />
      </div>
    </div>
  );
}
