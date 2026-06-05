import { Button, Card, Icon, Input, Select } from '@localo/ui';
import {
  shopApprovalOptions,
  shopStatusOptions
} from '../config';
import type { AdminShopListFilters } from '../hooks';

interface ShopFilterToolbarProps {
  filters: AdminShopListFilters;
  hasActiveFilters: boolean;
  isRefreshing: boolean;
  onReset: () => void;
  onUpdateFilter: <TKey extends keyof AdminShopListFilters>(
    key: TKey,
    value: AdminShopListFilters[TKey]
  ) => void;
}

export function ShopFilterToolbar({
  filters,
  hasActiveFilters,
  isRefreshing,
  onReset,
  onUpdateFilter
}: ShopFilterToolbarProps) {
  return (
    <Card className="space-y-4" padding="md">
      <div className="flex items-center gap-2 text-sm font-bold text-localo-text">
        <Icon name="filter" size="sm" tone="primary" />
        Filters
      </div>
      <div className="grid gap-3 lg:grid-cols-[minmax(20rem,1fr)_13rem_13rem_auto]">
        <div className="relative">
          <Icon
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
            name="search"
            size="sm"
            tone="muted"
          />
          <Input
            aria-label="Search shops"
            className="pl-10"
            disabled={isRefreshing}
            onChange={(event) => onUpdateFilter('search', event.target.value)}
            placeholder="Search by shop, owner, email..."
            value={filters.search}
          />
        </div>
        <Select
          aria-label="Filter by shop status"
          disabled={isRefreshing}
          onChange={(event) => onUpdateFilter('status', event.target.value)}
          options={shopStatusOptions}
          value={filters.status}
        />
        <Select
          aria-label="Filter by approval status"
          disabled={isRefreshing}
          onChange={(event) => onUpdateFilter('verificationStatus', event.target.value)}
          options={shopApprovalOptions}
          value={filters.verificationStatus}
        />
        <Button
          className="min-w-32"
          disabled={!hasActiveFilters || isRefreshing}
          onClick={onReset}
          type="button"
          variant="outline"
        >
          Reset
        </Button>
      </div>
    </Card>
  );
}
