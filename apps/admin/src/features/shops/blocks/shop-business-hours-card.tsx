import { Card, Icon } from '@localo/ui';

export function ShopBusinessHoursCard() {
  return (
    <Card>
      <h2 className="text-base font-bold text-localo-text">Business Hours</h2>
      <div className="mt-5 flex items-center justify-between gap-4 rounded-localo-xl border border-localo-border bg-localo-surface-muted p-4">
        <div className="flex items-center gap-3">
          <Icon bg="muted" name="clock" shape="circle" tone="navy" wrapperSize="lg" />
          <div>
            <p className="text-sm font-bold text-localo-text">Hours not available</p>
            <p className="text-xs text-localo-text-muted">Business hours are not included in this admin detail response yet.</p>
          </div>
        </div>
        <Icon name="chevronRight" size="sm" tone="muted" />
      </div>
    </Card>
  );
}
