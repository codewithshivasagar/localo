import type { ShopResponse } from '@localo/api-client';
import { Card, Icon } from '@localo/ui';

interface ShopHeroCardProps {
  shop: ShopResponse;
}

const dateFormatter = new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

function valueOrFallback(value?: string | null) {
  return value || 'Not available';
}

function formatDate(value?: string | null) {
  return value ? dateFormatter.format(new Date(value)) : 'Not available';
}

function HeroItem({ icon, label, value }: { icon: Parameters<typeof Icon>[0]['name']; label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Icon bg="muted" name={icon} shape="circle" tone="navy" wrapperSize="lg" />
      <div className="min-w-0">
        <p className="text-xs font-semibold text-localo-text-muted">{label}</p>
        <p className="truncate text-sm font-bold text-localo-text">{value}</p>
      </div>
    </div>
  );
}

export function ShopHeroCard({ shop }: ShopHeroCardProps) {
  return (
    <Card className="grid gap-6 lg:grid-cols-[8rem,1fr]" padding="lg">
      <div className="flex h-32 w-32 items-center justify-center rounded-localo-2xl border border-localo-primary/25 bg-localo-primary/10">
        <Icon name="shop" size={56} tone="primary" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <HeroItem icon="owner" label="Owner" value={shop.owner?.fullName ?? 'Not assigned'} />
        <HeroItem icon="phone" label="Phone" value={valueOrFallback(shop.phone ?? shop.owner?.phone)} />
        <HeroItem icon="mail" label="Email" value={valueOrFallback(shop.email ?? shop.owner?.email)} />
        <HeroItem icon="globe" label="Website" value={valueOrFallback(shop.websiteUrl)} />
        <HeroItem icon="mapPin" label="Location" value="Not available" />
        <HeroItem icon="calendar" label="Joined On" value={formatDate(shop.createdAt)} />
        <HeroItem icon="check" label="Approved On" value={formatDate(shop.approvedAt)} />
        <HeroItem icon="note" label="Shop ID" value={shop.id} />
      </div>
    </Card>
  );
}
