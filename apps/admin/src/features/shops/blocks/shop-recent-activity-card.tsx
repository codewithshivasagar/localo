import type { ShopResponse } from '@localo/api-client';
import { Card, Icon } from '@localo/ui';

interface ShopRecentActivityCardProps {
  shop: ShopResponse;
}

const dateFormatter = new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

export function ShopRecentActivityCard({ shop }: ShopRecentActivityCardProps) {
  const activities = [
    { label: 'Shop record created', date: shop.createdAt },
    { label: 'Shop record updated', date: shop.updatedAt }
  ];

  return (
    <Card>
      <h2 className="text-base font-bold text-localo-text">Recent Activity</h2>
      <div className="mt-5 space-y-4">
        {activities.map((activity) => (
          <div className="flex gap-3" key={activity.label}>
            <Icon bg="success" name="check" shape="circle" tone="white" wrapperSize="md" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-localo-text">{activity.label}</p>
              <p className="text-xs text-localo-text-muted">{dateFormatter.format(new Date(activity.date))}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
