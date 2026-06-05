'use client';

import { Button, Card, Icon, SearchInput, Select } from '@localo/ui';
import { MEDIA_TAG_CATEGORY_IMAGE, MEDIA_TYPE_FILTER_OPTIONS } from '../config/media.constants';
import type { MediaManagerFilterState } from '../types/media.types';

interface MediaFilterToolbarProps {
  filters: MediaManagerFilterState;
  isApiAvailable: boolean;
  isLoading?: boolean;
  onRefresh: () => void;
  onReset: () => void;
  onSearchChange: (value: string) => void;
  onTagChange: (value: string) => void;
  onTypeChange: (value: MediaManagerFilterState['type']) => void;
}

export function MediaFilterToolbar({
  filters,
  isApiAvailable,
  isLoading,
  onRefresh,
  onReset,
  onSearchChange,
  onTagChange,
  onTypeChange
}: MediaFilterToolbarProps) {
  return (
    <Card className="space-y-4" padding="md">
      <div className="grid gap-3 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto] xl:items-end">
        <SearchInput
          aria-label="Search media"
          className="min-h-12 w-full"
          disabled={!isApiAvailable}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search filename or title"
          value={filters.search}
        />

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <Select
            disabled={!isApiAvailable}
            onChange={(event) => onTypeChange(event.target.value as MediaManagerFilterState['type'])}
            placeholder="All types"
            value={filters.type}
          >
            {MEDIA_TYPE_FILTER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select
            disabled={!isApiAvailable}
            onChange={(event) => onTagChange(event.target.value)}
            placeholder="All tags"
            value={filters.tag}
          >
            <option value={MEDIA_TAG_CATEGORY_IMAGE}>Category visuals</option>
            <option value="brand">Brand assets</option>
            <option value="auth">Auth assets</option>
          </Select>

          <div className="flex gap-2">
            <Button
              disabled={!isApiAvailable || isLoading}
              fullWidth
              leftIcon={<Icon name="refresh" size="sm" tone="current" />}
              onClick={onRefresh}
              type="button"
              variant="outline"
            >
              Refresh
            </Button>
            <Button disabled={!isApiAvailable} fullWidth onClick={onReset} type="button" variant="ghost">
              Reset
            </Button>
          </div>
        </div>
      </div>

      {!isApiAvailable ? (
        <p className="text-xs font-medium text-localo-text-muted">Media API will be added next.</p>
      ) : null}
    </Card>
  );
}
