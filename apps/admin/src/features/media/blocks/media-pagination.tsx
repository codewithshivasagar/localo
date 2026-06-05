'use client';

import type { PaginationMeta } from '@localo/api-client';
import {
  Pagination,
  PaginationActions,
  PaginationButton,
  PaginationInfo,
  Select
} from '@localo/ui';
import { MEDIA_PAGE_SIZE_OPTIONS } from '../config/media.constants';

interface MediaPaginationProps {
  isDisabled?: boolean;
  meta?: PaginationMeta;
  page: number;
  limit: number;
  onChangePage: (page: number) => void;
  onChangeLimit: (limit: number) => void;
}

export function MediaPagination({
  isDisabled,
  meta,
  page,
  limit,
  onChangePage,
  onChangeLimit
}: MediaPaginationProps) {
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
        Showing {start}-{end} of {meta.total} media files
      </PaginationInfo>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Select
          aria-label="Rows per page"
          className="sm:w-36"
          disabled={isDisabled}
          onChange={(event) => onChangeLimit(Number(event.target.value))}
          options={MEDIA_PAGE_SIZE_OPTIONS}
          value={String(limit)}
        />
        <PaginationActions>
          <PaginationButton
            disabled={!hasPreviousPage || isDisabled}
            onClick={() => onChangePage(page - 1)}
            type="button"
          >
            Previous
          </PaginationButton>
          <PaginationButton
            disabled={!hasNextPage || isDisabled}
            onClick={() => onChangePage(page + 1)}
            type="button"
          >
            Next
          </PaginationButton>
        </PaginationActions>
      </div>
    </Pagination>
  );
}
