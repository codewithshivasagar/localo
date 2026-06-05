import { Button, Card, Icon } from '@localo/ui';
import { adminShopRoutes } from '../config';

interface ShopQuickActionsCardProps {
  shopId: string;
}

export function ShopQuickActionsCard({ shopId }: ShopQuickActionsCardProps) {
  const actions = [
    'Change Shop Status',
    'Assign / Change Owner',
    'Manage Shop Products',
    'View Shop on Website',
    'Suspend Shop'
  ];

  return (
    <Card>
      <h2 className="text-base font-bold text-localo-text">Quick Actions</h2>
      <div className="mt-5 space-y-2">
        {actions.map((action) => (
          <Button className="justify-between" disabled={action !== 'Manage Shop Products'} fullWidth key={action} rightIcon={<Icon name="chevronRight" size="sm" tone="current" />} type="button" variant="outline">
            {action}
          </Button>
        ))}
      </div>
      <p className="mt-3 text-xs text-localo-text-muted">Products will use {adminShopRoutes.detail(shopId)}/products in UI-8.4.</p>
    </Card>
  );
}
