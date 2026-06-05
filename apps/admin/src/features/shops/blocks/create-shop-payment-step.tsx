import { Alert, Input, Textarea } from '@localo/ui';
import type { CreateShopFormState } from '../schemas';

interface StepProps {
  form: CreateShopFormState;
  updateField: <TKey extends keyof CreateShopFormState>(key: TKey, value: CreateShopFormState[TKey]) => void;
}

export function CreateShopPaymentStep({ form, updateField }: StepProps) {
  return (
    <div className="space-y-5">
      <Alert description="Payment fields are optional and local to this shell until backend support is wired in UI-8.3C." title="Optional for now" variant="info" />
      <div className="grid gap-4 sm:grid-cols-2">
        {([
          ['upiId', 'UPI ID'],
          ['accountHolderName', 'Account Holder Name'],
          ['bankAccountNumber', 'Bank Account Number'],
          ['ifsc', 'IFSC'],
          ['gstNumber', 'GST'],
          ['pan', 'PAN']
        ] as const).map(([key, label]) => (
          <div key={key}>
            <label className="text-sm font-bold text-localo-text" htmlFor={key}>{label}</label>
            <Input id={key} onChange={(event) => updateField(key, event.target.value)} value={form[key]} />
          </div>
        ))}
      </div>
      <Textarea placeholder="Notes for settlement preferences..." />
    </div>
  );
}
