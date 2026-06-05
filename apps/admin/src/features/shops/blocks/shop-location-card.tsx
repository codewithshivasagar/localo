import { Button, Card, Icon } from '@localo/ui';

export function ShopLocationCard() {
  return (
    <Card>
      <h2 className="text-base font-bold text-localo-text">Business Address</h2>
      <div className="mt-4 flex h-36 items-center justify-center rounded-localo-xl border border-dashed border-localo-border bg-localo-surface-muted">
        <Icon bg="primary" name="mapPin" shape="circle" tone="white" wrapperSize="xl" />
      </div>
      <p className="mt-4 text-sm leading-6 text-localo-text-muted">Address details are not available in the current admin shop response.</p>
      <Button className="mt-4" disabled rightIcon={<Icon name="globe" size="sm" tone="current" />} type="button" variant="outline">
        View on Map
      </Button>
    </Card>
  );
}
