import type { PaginationMeta } from '@localo/api-client';
import {
  Pagination,
  PaginationActions,
  PaginationButton,
  PaginationInfo,
  Select
} from '@localo/ui';
import { shopPageSizeOptions } from '../config';
import type { AdminShopListFilters } from '../hooks';

interface ShopsPaginationProps {
  filters: AdminShopListFilters;
  isDisabled?: boolean;
  meta?: PaginationMeta;
  onUpdateFilter: <TKey extends keyof AdminShopListFilters>(
    key: TKey,
    value: AdminShopListFilters[TKey]
  ) => void;
}

export function ShopsPagination({
  filters,
  isDisabled,
  meta,
  onUpdateFilter
}: ShopsPaginationProps) {
  if (!meta) {
    return null;
  }

  const start = meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1;
  const end = Math.min(meta.page * meta.limit, meta.total);
  const hasPreviousPage = meta.page > 1;
  const hasNextPage = meta.page < meta.totalPages;

  return (
    <Pagination className="rounded-localo-2xl border border-localo-border bg-localo-surface p-4 shadow-localo-sm">
      <PaginationInfo>
        Showing {start}-{end} of {meta.total} shops
      </PaginationInfo>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Select
          aria-label="Rows per page"
          className="sm:w-36"
          disabled={isDisabled}
          onChange={(event) => onUpdateFilter('limit', Number(event.target.value))}
          options={shopPageSizeOptions}
          value={String(filters.limit)}
        />
        <PaginationActions>
          <PaginationButton
            disabled={!hasPreviousPage || isDisabled}
            onClick={() => onUpdateFilter('page', filters.page - 1)}
            type="button"
          >
            Previous
          </PaginationButton>
          <PaginationButton
            disabled={!hasNextPage || isDisabled}
            onClick={() => onUpdateFilter('page', filters.page + 1)}
            type="button"
          >
            Next
          </PaginationButton>
        </PaginationActions>
      </div>
    </Pagination>
  );
}
