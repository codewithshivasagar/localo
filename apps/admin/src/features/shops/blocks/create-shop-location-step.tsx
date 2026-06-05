import { Button, Card, Icon, Input, Select } from '@localo/ui';
import type { CreateShopFormState } from '../schemas';

interface StepProps {
  form: CreateShopFormState;
  updateField: <TKey extends keyof CreateShopFormState>(key: TKey, value: CreateShopFormState[TKey]) => void;
}

export function CreateShopLocationStep({ form, updateField }: StepProps) {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 lg:grid-cols-[1fr,auto]">
        <Input leftIcon={<Icon name="search" size="sm" tone="muted" />} onChange={(event) => updateField('searchAddress', event.target.value)} placeholder="Search for address, place, or landmark" value={form.searchAddress} />
        <Button disabled leftIcon={<Icon name="location" size="sm" tone="current" />} type="button" variant="outline">Use Current Location</Button>
      </div>
      <Card className="flex h-52 items-center justify-center border-dashed bg-localo-surface-muted" variant="subtle">
        <div className="text-center">
          <Icon bg="primary" name="mapPin" shape="circle" tone="white" wrapperSize="xl" />
          <p className="mt-3 text-sm font-semibold text-localo-text">Map/location selector placeholder</p>
          <p className="text-xs text-localo-text-muted">TODO: add free map/geocoding selector in UI-8.3C.</p>
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2">
        {([
          ['addressLine1', 'Address Line 1 *'],
          ['addressLine2', 'Address Line 2'],
          ['landmark', 'Landmark'],
          ['area', 'Area *'],
          ['city', 'City *'],
          ['state', 'State *'],
          ['postalCode', 'Postal Code *'],
          ['latitude', 'Latitude'],
          ['longitude', 'Longitude']
        ] as const).map(([key, label]) => (
          <div key={key}>
            <label className="text-sm font-bold text-localo-text" htmlFor={key}>{label}</label>
            <Input id={key} onChange={(event) => updateField(key, event.target.value)} value={form[key]} />
          </div>
        ))}
        <div>
          <label className="text-sm font-bold text-localo-text" htmlFor="country">Country *</label>
          <Select id="country" onChange={(event) => updateField('country', event.target.value)} options={[{ label: 'India', value: 'India' }]} value={form.country} />
        </div>
      </div>
    </div>
  );
}
