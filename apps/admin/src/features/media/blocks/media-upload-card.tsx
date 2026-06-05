'use client';

import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Icon } from '@localo/ui';
import { MEDIA_MANAGER_COPY } from '../config/media.constants';

interface MediaUploadCardProps {
  isApiAvailable: boolean;
  onUploadClick: () => void;
}

export function MediaUploadCard({ isApiAvailable, onUploadClick }: MediaUploadCardProps) {
  return (
    <Card className="h-full" padding="lg" variant="elevated">
      <CardHeader>
        <Badge className="w-fit" variant="outline">
          Upload
        </Badge>
        <CardTitle>Upload Media</CardTitle>
        <CardDescription>
          Reusable media is what category visuals and future assets will use across Localo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-localo-2xl border border-dashed border-localo-border bg-localo-surface-muted p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-localo-2xl bg-localo-primary/10 text-localo-primary">
              <Icon name="image" size="md" tone="current" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-localo-text">Category visuals ready</p>
              <p className="mt-1 text-sm leading-6 text-localo-text-muted">
                Tag category artwork with <span className="font-semibold text-localo-text">category-image</span> so category forms can pick it up later.
              </p>
            </div>
          </div>
          <Button
            className="mt-5"
            disabled={!isApiAvailable}
            fullWidth
            leftIcon={<Icon name="plus" size="sm" tone="current" />}
            onClick={onUploadClick}
            type="button"
            variant="primary"
          >
            Upload Media
          </Button>
          <p className="mt-3 text-xs font-medium text-localo-text-muted">
            {isApiAvailable ? MEDIA_MANAGER_COPY.uploadHelper : MEDIA_MANAGER_COPY.uploadUnavailableHelper}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
