import { Button, Card, Icon, Input, Select } from '@localo/ui';
import { categoryScopeOptions, categoryStatusOptions } from '../config';
import type { AdminCategoryListFilters } from '../types';

interface CategoryFilterToolbarProps {
  filters: AdminCategoryListFilters;
  hasActiveFilters: boolean;
  isRefreshing: boolean;
  onReset: () => void;
  onRefresh: () => void;
  onUpdateFilter: <TKey extends keyof AdminCategoryListFilters>(
    key: TKey,
    value: AdminCategoryListFilters[TKey]
  ) => void;
}

export function CategoryFilterToolbar({
  filters,
  hasActiveFilters,
  isRefreshing,
  onReset,
  onRefresh,
  onUpdateFilter
}: CategoryFilterToolbarProps) {
  return (
    <Card className="space-y-4" padding="md">
      <div className="flex items-center gap-2 text-sm font-bold text-localo-text">
        <Icon name="filter" size="sm" tone="primary" />
        Filters
      </div>
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_11rem_11rem_auto]">
        <div className="relative">
          <Icon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" name="search" size="sm" tone="muted" />
          <Input
            aria-label="Search categories"
            className="pl-10"
            disabled={isRefreshing}
            onChange={(event) => onUpdateFilter('search', event.target.value)}
            placeholder="Search by name or slug..."
            value={filters.search}
          />
        </div>
        <Select
          aria-label="Filter by status"
          disabled={isRefreshing}
          onChange={(event) => onUpdateFilter('isActive', event.target.value)}
          options={categoryStatusOptions}
          value={filters.isActive}
        />
        <Select
          aria-label="Filter by hierarchy"
          disabled={isRefreshing}
          onChange={(event) => onUpdateFilter('scope', event.target.value as AdminCategoryListFilters['scope'])}
          options={categoryScopeOptions}
          value={filters.scope}
        />
        <div className="flex flex-col gap-2 sm:flex-row lg:justify-end">
          <Button
            className="sm:min-w-32"
            disabled={!hasActiveFilters || isRefreshing}
            onClick={onReset}
            type="button"
            variant="outline"
          >
            Reset
          </Button>
          <Button
            className="sm:min-w-32"
            disabled={isRefreshing}
            isLoading={isRefreshing}
            leftIcon={<Icon name="refresh" size="sm" tone="current" />}
            onClick={onRefresh}
            type="button"
            variant="outline"
          >
            Refresh
          </Button>
        </div>
      </div>
    </Card>
  );
}
