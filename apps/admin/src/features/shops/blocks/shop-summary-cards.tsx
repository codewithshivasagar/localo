import { Card, Icon } from '@localo/ui';
import type { AdminShopListMetrics } from '../hooks';

interface ShopSummaryCardsProps {
  metrics: AdminShopListMetrics;
}

const summaryItems = [
  {
    description: 'Across matching filters',
    icon: 'shop',
    key: 'total',
    label: 'Total Shops',
    tone: 'primary'
  },
  {
    description: 'In current results',
    icon: 'check',
    key: 'active',
    label: 'Active',
    tone: 'success'
  },
  {
    description: 'Awaiting review',
    icon: 'clock',
    key: 'pendingApproval',
    label: 'Pending Approval',
    tone: 'warning'
  },
  {
    description: 'Needs attention',
    icon: 'alert',
    key: 'suspended',
    label: 'Suspended',
    tone: 'danger'
  }
] as const;

export function ShopSummaryCards({ metrics }: ShopSummaryCardsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Shop summary">
      {summaryItems.map((item) => (
        <Card className="flex items-start justify-between gap-4" key={item.key} padding="md">
          <div className="min-w-0">
            <p className="text-sm font-medium text-localo-text-muted">{item.label}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-localo-text">{metrics[item.key]}</p>
            <p className="mt-1 text-xs font-medium text-localo-text-muted">{item.description}</p>
          </div>
          <Icon
            bg={item.tone}
            name={item.icon}
            shape="rounded"
            tone="white"
            wrapperSize="xl"
          />
        </Card>
      ))}
    </section>
  );
}
