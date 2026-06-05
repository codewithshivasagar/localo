import { Alert, Card, Icon } from '@localo/ui';
import type { CreateShopFormState } from '../schemas';

interface StepProps {
  form: CreateShopFormState;
  onEditStep: (stepIndex: number) => void;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 text-sm sm:grid-cols-[12rem,1fr]">
      <span className="text-localo-text-muted">{label}</span>
      <span className="font-semibold text-localo-text">{value || 'Not provided'}</span>
    </div>
  );
}

export function CreateShopReviewStep({ form, onEditStep }: StepProps) {
  const sections = [
    { icon: 'shop', title: 'Basic Info', step: 0, rows: [['Shop Name', form.name], ['Slug', form.slug], ['Short Description', form.shortDescription]] },
    { icon: 'phone', title: 'Contact Details', step: 1, rows: [['Phone', form.phone], ['Email', form.email], ['Website', form.website]] },
    { icon: 'categories', title: 'Category & Discovery', step: 2, rows: [['Category ID', form.categoryId], ['Tags', form.tags], ['Featured', form.isFeatured ? 'Yes' : 'No']] },
    { icon: 'mapPin', title: 'Location', step: 3, rows: [['Address', form.addressLine1], ['City', form.city], ['Coordinates', [form.latitude, form.longitude].filter(Boolean).join(', ')]] },
    { icon: 'commission', title: 'Payment Details', step: 4, rows: [['UPI ID', form.upiId], ['Account Holder', form.accountHolderName], ['GST', form.gstNumber]] }
  ] as const;

  return (
    <div className="space-y-5">
      <Alert description="Please review the shell data below. API creation is intentionally deferred to UI-8.3C." title="Your shop shell is ready to review" variant="success" />
      {sections.map((section) => (
        <Card className="space-y-3" key={section.title} variant="subtle">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Icon bg="success" name={section.icon} shape="circle" tone="primary" wrapperSize="lg" />
              <h3 className="font-bold text-localo-text">{section.title}</h3>
            </div>
            <button className="text-sm font-bold text-localo-primary" onClick={() => onEditStep(section.step)} type="button">Edit</button>
          </div>
          {section.rows.map(([label, value]) => <Row key={label} label={label} value={value} />)}
        </Card>
      ))}
    </div>
  );
}
