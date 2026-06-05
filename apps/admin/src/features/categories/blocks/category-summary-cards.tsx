import { Card, Icon } from '@localo/ui';
import type { AdminCategoryListMetrics } from '../types';

interface CategorySummaryCardsProps {
  metrics: AdminCategoryListMetrics;
}

const summaryItems = [
  {
    description: 'Across the current admin view',
    icon: 'categories',
    key: 'total',
    label: 'Total Categories',
    tone: 'primary'
  },
  {
    description: 'Visible in the current results',
    icon: 'check',
    key: 'active',
    label: 'Active',
    tone: 'success'
  },
  {
    description: 'Top-level categories',
    icon: 'box',
    key: 'root',
    label: 'Root Categories',
    tone: 'primary'
  },
  {
    description: 'Nested under a parent',
    icon: 'filter',
    key: 'subcategories',
    label: 'Subcategories',
    tone: 'warning'
  }
] as const;

export function CategorySummaryCards({ metrics }: CategorySummaryCardsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Category summary">
      {summaryItems.map((item) => (
        <Card className="flex min-h-36 items-start justify-between gap-4" key={item.key} padding="md">
          <div className="min-w-0">
            <p className="text-sm font-bold text-localo-text-muted">{item.label}</p>
            <p className="mt-2 text-3xl font-black tracking-tight text-localo-text">{metrics[item.key]}</p>
            <p className="mt-2 text-xs font-semibold text-localo-text-muted">{item.description}</p>
          </div>
          <Icon
            bg={item.tone}
            name={item.icon}
            shape="circle"
            tone={item.tone === 'warning' ? 'warning' : item.tone === 'success' ? 'success' : 'primary'}
            wrapperSize={48}
          />
        </Card>
      ))}
    </section>
  );
}
