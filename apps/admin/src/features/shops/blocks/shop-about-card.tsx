import type { ShopResponse } from '@localo/api-client';
import { Card, Icon } from '@localo/ui';

interface ShopAboutCardProps {
  shop: ShopResponse;
}

export function ShopAboutCard({ shop }: ShopAboutCardProps) {
  return (
    <Card className="lg:col-span-2">
      <h2 className="text-base font-bold text-localo-text">About Shop</h2>
      <p className="mt-4 text-sm leading-6 text-localo-text-muted">{shop.description || 'No shop description has been added yet.'}</p>
      <div className="mt-6 grid gap-4 border-t border-localo-border pt-5 sm:grid-cols-2 xl:grid-cols-3">
        <div className="flex gap-3">
          <Icon bg="success" name="categories" shape="circle" tone="white" wrapperSize="lg" />
          <div>
            <p className="text-xs font-semibold text-localo-text-muted">Primary Category</p>
            <p className="text-sm font-bold text-localo-text">{shop.primaryCategory?.name ?? 'Not available'}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Icon bg="muted" name="truck" shape="circle" tone="navy" wrapperSize="lg" />
          <div>
            <p className="text-xs font-semibold text-localo-text-muted">Delivery</p>
            <p className="text-sm font-bold text-localo-text">Not available</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Icon bg="muted" name="box" shape="circle" tone="navy" wrapperSize="lg" />
          <div>
            <p className="text-xs font-semibold text-localo-text-muted">Minimum Order</p>
            <p className="text-sm font-bold text-localo-text">Not available</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
