'use client';

import {
  Badge,
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Icon
} from '@localo/ui';
import type { MediaRecord } from '../types/media.types';

interface MediaCardProps {
  media: MediaRecord;
  onDelete?: (media: MediaRecord) => void;
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

export function MediaCard({ media, onDelete }: MediaCardProps) {
  const preview = media.publicUrl ? (
    <img alt={media.altText ?? media.title ?? media.filename} className="h-full w-full object-cover" src={media.publicUrl} />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-localo-surface-muted text-localo-text-muted">
      <Icon name={media.type === 'document' ? 'note' : 'image'} size="lg" tone="muted" />
    </div>
  );

  return (
    <Card className="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-localo-lg" padding="none" variant="elevated">
      <div className="aspect-[4/3] bg-localo-surface-muted">{preview}</div>
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-localo-text">{media.title ?? media.filename}</p>
            <p className="mt-1 truncate text-xs font-medium text-localo-text-muted">{media.mimeType}</p>
          </div>
          <Badge variant="outline">{media.type}</Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {media.tags.length ? (
            media.tags.map((tag) => (
              <Badge key={tag} variant={tag === 'category-image' ? 'primary' : 'outline'}>
                {tag}
              </Badge>
            ))
          ) : (
            <Badge variant="outline">No tags</Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-xs font-medium text-localo-text-muted">
          <span>{formatSize(media.sizeBytes)}</span>
          <span>{new Date(media.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            fullWidth
            size="sm"
            disabled={!media.publicUrl}
            variant="outline"
            onClick={() => {
              if (!media.publicUrl) {
                return;
              }

              window.open(media.publicUrl, '_blank', 'noopener,noreferrer');
            }}
          >
            View
          </Button>
          <Dropdown>
            <DropdownTrigger aria-label="Media actions" className="min-h-10 px-3">
              <Icon name="moreHorizontal" size="sm" tone="current" />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                disabled={!media.publicUrl}
                onClick={async () => {
                  if (!media.publicUrl) {
                    return;
                  }

                  if (navigator.clipboard?.writeText) {
                    await navigator.clipboard.writeText(media.publicUrl).catch(() => {});
                  }
                }}
                type="button"
              >
                Copy URL
              </DropdownItem>
              <DropdownItem disabled type="button">
                Edit Tags
              </DropdownItem>
              <DropdownItem disabled={!onDelete} onClick={() => onDelete?.(media)} type="button">
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </Card>
  );
}
