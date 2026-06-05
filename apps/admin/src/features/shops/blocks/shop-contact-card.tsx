import type { ShopResponse } from '@localo/api-client';
import { Card, Icon } from '@localo/ui';

interface ShopContactCardProps {
  shop: ShopResponse;
}

function valueOrFallback(value?: string | null) {
  return value || 'Not available';
}

export function ShopContactCard({ shop }: ShopContactCardProps) {
  const rows = [
    { icon: 'phone', label: 'Phone', value: valueOrFallback(shop.phone ?? shop.owner?.phone) },
    { icon: 'mail', label: 'Email', value: valueOrFallback(shop.email ?? shop.owner?.email) },
    { icon: 'globe', label: 'Website', value: valueOrFallback(shop.websiteUrl) },
    { icon: 'clock', label: 'Support Response Time', value: 'Not available' }
  ] as const;

  return (
    <Card>
      <h2 className="text-base font-bold text-localo-text">Contact & Communication</h2>
      <div className="mt-5 space-y-3">
        {rows.map((row) => (
          <div className="flex items-center justify-between gap-4" key={row.label}>
            <span className="text-sm text-localo-text-muted">{row.label}</span>
            <span className="inline-flex min-w-0 items-center gap-2 text-right text-sm font-semibold text-localo-text">
              <span className="truncate">{row.value}</span>
              <Icon name={row.icon} size="xs" tone="muted" />
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
