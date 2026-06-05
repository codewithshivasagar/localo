'use client';

import { Button, EmptyState, ErrorState, Icon, LoadingState } from '@localo/ui';
import { MediaCard } from './media-card';
import type { MediaRecord } from '../types/media.types';

interface MediaGridProps {
  error?: string | null;
  items: MediaRecord[];
  isApiAvailable: boolean;
  isLoading?: boolean;
  hasActiveFilters?: boolean;
  onDelete?: (media: MediaRecord) => void;
  onRetry?: () => void;
}

export function MediaGrid({
  error,
  hasActiveFilters,
  items,
  isApiAvailable,
  isLoading,
  onDelete,
  onRetry
}: MediaGridProps) {
  if (isLoading) {
    return <LoadingState description="Preparing the media library." label="Loading media" />;
  }

  if (error) {
    return (
      <ErrorState
        action={
          onRetry ? (
            <Button leftIcon={<Icon name="refresh" size="sm" tone="current" />} onClick={onRetry} type="button">
              Retry
            </Button>
          ) : null
        }
        description={error}
        title="Media library unavailable"
      />
    );
  }

  if (!isApiAvailable) {
    return (
      <EmptyState
        description="The Media API is not available yet. This shell keeps the admin workspace ready for the next backend phase."
        icon={<Icon name="image" size="lg" tone="muted" />}
        title="Media manager foundation"
      />
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        description={
          hasActiveFilters
            ? 'No media matched the current filters.'
            : 'No media uploaded yet. Use the upload card to add reusable assets.'
        }
        icon={<Icon name="image" size="lg" tone="muted" />}
        title={hasActiveFilters ? 'No media found' : 'No media yet'}
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((media) => (
        <MediaCard key={media.id} media={media} onDelete={onDelete} />
      ))}
    </div>
  );
}
