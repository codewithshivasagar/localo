import type { ShopResponse } from '@localo/api-client';
import { Card, Icon } from '@localo/ui';

interface ShopKeyMetricsCardProps {
  shop: ShopResponse;
}

export function ShopKeyMetricsCard({ shop }: ShopKeyMetricsCardProps) {
  const metrics = [
    { icon: 'products', label: 'Total Products', value: 'Not available' },
    { icon: 'star', label: 'Average Rating', value: shop.ratingAvg ? Number(shop.ratingAvg).toFixed(1) : 'No rating' },
    { icon: 'package', label: 'Total Orders', value: 'Not available' },
    { icon: 'activity', label: 'Completion Rate', value: 'Not available' }
  ] as const;

  return (
    <Card className="lg:col-span-2">
      <h2 className="text-base font-bold text-localo-text">Key Metrics</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div className="rounded-localo-xl bg-localo-surface-muted p-4" key={metric.label}>
            <Icon name={metric.icon} size="sm" tone="primary" />
            <p className="mt-3 text-lg font-bold text-localo-text">{metric.value}</p>
            <p className="text-xs font-medium text-localo-text-muted">{metric.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
