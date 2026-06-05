'use client';

import { useMemo, useState } from 'react';
import {
  Badge,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ConfirmDialog,
  Icon,
  PageContainer,
  PageHeader
} from '@localo/ui';
import { MEDIA_MANAGER_COPY, MEDIA_TAG_CATEGORY_IMAGE } from '../config/media.constants';
import { MediaFilterToolbar } from '../blocks/media-filter-toolbar';
import { MediaGrid } from '../blocks/media-grid';
import { MediaPagination } from '../blocks/media-pagination';
import { MediaSummaryCards } from '../blocks/media-summary-cards';
import { MediaUploadCard } from '../blocks/media-upload-card';
import { MediaUploadDialog } from '../blocks/media-upload-dialog';
import { useAdminMediaList } from '../hooks/use-admin-media-list';
import type { MediaRecord } from '../types/media.types';

export function MediaManagerTemplate() {
  const {
    deleteMedia,
    error,
    filters,
    isApiAvailable,
    isDeleting,
    isLoading,
    isRefreshing,
    isUploading,
    items,
    meta,
    refresh,
    resetFilters,
    setLimit,
    setPage,
    setSearch,
    setTag,
    setType,
    summary,
    uploadMedia
  } = useAdminMediaList();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<MediaRecord | null>(null);

  const hasActiveFilters = useMemo(
    () => Boolean(filters.search || filters.tag || filters.type !== 'all'),
    [filters.search, filters.tag, filters.type]
  );

  return (
    <PageContainer className="space-y-6">
      <Breadcrumbs
        items={[
          { href: '/dashboard', label: 'Dashboard' },
          { current: true, label: 'Media' }
        ]}
      />

      <PageHeader
        actions={
          <Button
            disabled={!isApiAvailable}
            leftIcon={<Icon name="plus" size="sm" tone="current" />}
            onClick={() => setIsUploadOpen(true)}
            size="sm"
            variant="primary"
          >
            Upload Media
          </Button>
        }
        description={MEDIA_MANAGER_COPY.description}
        eyebrow="Assets"
        title={MEDIA_MANAGER_COPY.title}
      />

      <MediaSummaryCards
        documents={summary.documents}
        images={summary.images}
        svgs={summary.svgs}
        total={meta?.total ?? summary.total}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <MediaFilterToolbar
            filters={filters}
            isApiAvailable={isApiAvailable}
            isLoading={isRefreshing || isLoading}
            onRefresh={refresh}
            onReset={resetFilters}
            onSearchChange={setSearch}
            onTagChange={setTag}
            onTypeChange={setType}
          />

          <Card padding="lg">
            <CardHeader className="text-left">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="w-fit" variant="outline">
                  {MEDIA_TAG_CATEGORY_IMAGE}
                </Badge>
                {hasActiveFilters ? <Badge className="w-fit" variant="muted">Filtered view</Badge> : null}
              </div>
              <CardTitle>Media Library</CardTitle>
              <CardDescription>
                Reusable assets for category visuals, shop branding, and other admin surfaces.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <MediaGrid
                error={error}
                hasActiveFilters={hasActiveFilters}
                isApiAvailable={isApiAvailable}
                isLoading={isLoading}
                items={items}
                onDelete={(media) => setDeleteTarget(media)}
                onRetry={refresh}
              />

              <MediaPagination
                isDisabled={!isApiAvailable || isLoading || isRefreshing}
                limit={filters.limit}
                meta={meta}
                onChangeLimit={setLimit}
                onChangePage={setPage}
                page={filters.page}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <MediaUploadCard isApiAvailable={isApiAvailable} onUploadClick={() => setIsUploadOpen(true)} />
          <Card padding="lg" variant="subtle">
            <CardHeader className="text-left">
              <Badge className="w-fit" variant="primary">
                Category visuals
              </Badge>
              <CardTitle>Tag guidance</CardTitle>
              <CardDescription>
                Category artwork should be tagged as category-image so category forms can select it cleanly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-localo-text-muted">
              <p>Supported assets: images, SVGs, and documents.</p>
              <p>Use the upload form to give media reusable titles, alt text, and tags.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <MediaUploadDialog
        isOpen={isUploadOpen}
        isUploading={isUploading}
        onClose={() => setIsUploadOpen(false)}
        onSubmit={uploadMedia}
      />

      <ConfirmDialog
        confirmLabel="Delete media"
        description={`Delete ${deleteTarget?.title ?? deleteTarget?.filename ?? 'this media file'}? This removes the database record and local file when possible.`}
        isOpen={Boolean(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (!deleteTarget) {
            return;
          }

          try {
            await deleteMedia(deleteTarget.id);
            setDeleteTarget(null);
          } catch {
            // The hook already surfaces a safe error message for the grid state.
          }
        }}
        title="Delete media"
        variant="destructive"
        isPending={isDeleting}
      />
    </PageContainer>
  );
}
