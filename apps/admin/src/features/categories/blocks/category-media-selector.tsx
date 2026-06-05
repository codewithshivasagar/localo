'use client';

import { Alert, Badge, Button, Card, EmptyState, Icon, Input } from '@localo/ui';
import type { MediaResponse } from '@localo/api-client';

interface CategoryMediaSelectorProps {
  error: string | null;
  isApiAvailable: boolean;
  isLoading: boolean;
  media: MediaResponse[];
  onClearSelection: () => void;
  onRefresh: () => void;
  onSearchChange: (value: string) => void;
  onSelectMedia: (media: MediaResponse) => void;
  search: string;
  selectedMedia: MediaResponse | null;
}

function formatSize(sizeBytes?: number | null) {
  if (!sizeBytes) {
    return 'Not available';
  }

  if (sizeBytes < 1024) {
    return `${sizeBytes} B`;
  }

  if (sizeBytes < 1024 * 1024) {
    return `${Math.round(sizeBytes / 1024)} KB`;
  }

  return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function CategoryMediaSelector({
  error,
  isApiAvailable,
  isLoading,
  media,
  onClearSelection,
  onRefresh,
  onSearchChange,
  onSelectMedia,
  search,
  selectedMedia
}: CategoryMediaSelectorProps) {
  if (!isApiAvailable) {
    return (
      <Alert
        description="The media API is not available yet. Upload and selection will be enabled when media endpoints are live."
        title="Media picker unavailable"
        variant="info"
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex-1">
          <Input
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search category visuals..."
            value={search}
          />
        </div>
        <Button leftIcon={<Icon name="refresh" size="sm" tone="current" />} onClick={onRefresh} type="button" variant="outline">
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <Card className="space-y-4" padding="md" variant="subtle">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-localo-text">Selected media</h4>
              <p className="text-sm text-localo-text-muted">Choose a reusable category visual tagged as category-image.</p>
            </div>
            <Badge variant="outline">category-image</Badge>
          </div>

          {error ? (
            <Alert description={error} title="Media could not be loaded" variant="warning" />
          ) : selectedMedia ? (
            <div className="flex items-start gap-3 rounded-localo-xl border border-localo-border bg-localo-surface p-3">
              <span className="flex h-16 w-16 shrink-0 overflow-hidden rounded-localo-lg border border-localo-border bg-localo-surface-muted">
                {selectedMedia.publicUrl ? (
                  <img
                    alt={selectedMedia.altText ?? selectedMedia.title ?? selectedMedia.filename}
                    className="h-full w-full object-cover"
                    src={selectedMedia.publicUrl}
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center">
                    <Icon name={selectedMedia.type === 'document' ? 'note' : 'image'} size="md" tone="muted" />
                  </span>
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-localo-text">{selectedMedia.title ?? selectedMedia.filename}</p>
                <p className="mt-1 truncate text-xs text-localo-text-muted">{selectedMedia.mimeType}</p>
                <p className="mt-1 text-xs text-localo-text-muted">{formatSize(selectedMedia.sizeBytes)}</p>
              </div>
              <Button onClick={onClearSelection} size="sm" type="button" variant="ghost">
                Clear
              </Button>
            </div>
          ) : (
            <EmptyState
              description="Pick a media asset from the grid on the right."
              icon={<Icon name="image" size="lg" tone="muted" />}
              title="No media selected"
            />
          )}
        </Card>

        <Card className="space-y-3" padding="md" variant="subtle">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-localo-text">Available visuals</h4>
              <p className="text-xs text-localo-text-muted">Filtered to reusable category-image assets.</p>
            </div>
            <Button onClick={onRefresh} size="sm" type="button" variant="ghost">
              Reload
            </Button>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              <div className="h-28 animate-pulse rounded-localo-xl bg-localo-surface-muted" />
              <div className="h-28 animate-pulse rounded-localo-xl bg-localo-surface-muted" />
            </div>
          ) : media.length === 0 ? (
            <EmptyState
              description="Upload reusable visuals in Media Manager and tag them as category-image."
              icon={<Icon name="image" size="lg" tone="muted" />}
              title="No visuals found"
            />
          ) : (
            <div className="grid gap-3">
              {media.map((item) => {
                const isSelected = item.id === selectedMedia?.id;

                return (
                  <button
                    className={[
                      'flex items-start gap-3 rounded-localo-xl border p-3 text-left transition',
                      isSelected
                        ? 'border-localo-primary bg-localo-primary/5 shadow-localo-sm'
                        : 'border-localo-border bg-localo-surface hover:bg-localo-surface-muted'
                    ].join(' ')}
                    key={item.id}
                    onClick={() => onSelectMedia(item)}
                    type="button"
                  >
                    <span className="flex h-14 w-14 shrink-0 overflow-hidden rounded-localo-lg border border-localo-border bg-localo-surface-muted">
                      {item.publicUrl ? (
                        <img
                          alt={item.altText ?? item.title ?? item.filename}
                          className="h-full w-full object-cover"
                          src={item.publicUrl}
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center">
                          <Icon name={item.type === 'document' ? 'note' : 'image'} size="sm" tone="muted" />
                        </span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-localo-text">{item.title ?? item.filename}</span>
                      <span className="mt-1 block truncate text-xs text-localo-text-muted">{item.mimeType}</span>
                      <span className="mt-2 flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant={tag === 'category-image' ? 'primary' : 'outline'}>
                            {tag}
                          </Badge>
                        ))}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
