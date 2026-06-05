'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PaginationMeta } from '@localo/api-client';
import { adminApiConfig } from '../../../config';
import { MEDIA_MANAGER_COPY, MEDIA_TAG_CATEGORY_IMAGE } from '../config/media.constants';
import { adminMediaApi } from '../config/admin-media-api';
import type {
  MediaManagerFilterState,
  MediaRecord,
  MediaSummary,
  MediaTypeFilter
} from '../types/media.types';

export interface UseAdminMediaListResult {
  deleteMedia: (id: string) => Promise<void>;
  error: string | null;
  filters: MediaManagerFilterState;
  isApiAvailable: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  isDeleting: boolean;
  isUploading: boolean;
  items: MediaRecord[];
  meta?: PaginationMeta;
  refresh: () => void;
  resetFilters: () => void;
  setLimit: (value: number) => void;
  setPage: (value: number) => void;
  setSearch: (value: string) => void;
  setTag: (value: string) => void;
  setType: (value: MediaTypeFilter) => void;
  summary: MediaSummary;
  uploadMedia: (formData: FormData) => Promise<void>;
}

const initialFilters: MediaManagerFilterState = {
  search: '',
  tag: '',
  type: 'all',
  page: 1,
  limit: 24
};

function buildSummary(items: MediaRecord[]): MediaSummary {
  return {
    total: items.length,
    images: items.filter((item) => item.type === 'image').length,
    svgs: items.filter((item) => item.type === 'svg').length,
    documents: items.filter((item) => item.type === 'document').length
  };
}

function toErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Unable to load media right now.';
}

export function useAdminMediaList(): UseAdminMediaListResult {
  const [filters, setFilters] = useState<MediaManagerFilterState>(initialFilters);
  const [items, setItems] = useState<MediaRecord[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadMedia = useCallback(async () => {
    if (!adminApiConfig.baseUrl) {
      setItems([]);
      setMeta(undefined);
      setError(null);
      setIsLoading(false);
      setIsRefreshing(false);
      return;
    }

    try {
      setError(null);
      const response = await adminMediaApi.list({
        limit: filters.limit,
        page: filters.page,
        search: filters.search || undefined,
        tag: filters.tag || undefined,
        type: filters.type
      });

      setItems(response.data);
      setMeta(response.meta);
    } catch (loadError) {
      setError(toErrorMessage(loadError));
      setItems([]);
      setMeta(undefined);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [filters.limit, filters.page, filters.search, filters.tag, filters.type]);

  useEffect(() => {
    if (isLoading) {
      void loadMedia();
      return;
    }

    setIsRefreshing(true);
    void loadMedia();
  }, [loadMedia, refreshKey]);

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    setRefreshKey((value) => value + 1);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setIsRefreshing(true);
    setRefreshKey((value) => value + 1);
  }, []);

  const updateFilter = useCallback(<TKey extends keyof MediaManagerFilterState>(
    key: TKey,
    value: MediaManagerFilterState[TKey]
  ) => {
    setFilters((current) => {
      const nextState: MediaManagerFilterState = {
        ...current,
        page: key === 'page' ? Number(value) : 1,
        [key]: value
      } as MediaManagerFilterState;

      return nextState;
    });
    setIsRefreshing(true);
  }, []);

  const uploadMedia = useCallback(async (formData: FormData) => {
    if (!adminApiConfig.baseUrl) {
      const errorMessage = 'Media API is not available yet.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }

    setIsUploading(true);

    try {
      await adminMediaApi.upload(formData);
      setRefreshKey((value) => value + 1);
    } catch (uploadError) {
      setError(toErrorMessage(uploadError));
      throw uploadError;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const deleteMedia = useCallback(async (id: string) => {
    if (!adminApiConfig.baseUrl) {
      const errorMessage = 'Media API is not available yet.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }

    setIsDeleting(true);

    try {
      await adminMediaApi.delete(id);
      setRefreshKey((value) => value + 1);
    } catch (deleteError) {
      setError(toErrorMessage(deleteError));
      throw deleteError;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const summary = useMemo(() => buildSummary(items), [items]);

  return {
    deleteMedia,
    error,
    filters,
    isApiAvailable: Boolean(adminApiConfig.baseUrl),
    isLoading,
    isRefreshing,
    isDeleting,
    isUploading,
    items,
    meta,
    refresh,
    resetFilters,
    setLimit: (value) => updateFilter('limit', value),
    setPage: (value) => updateFilter('page', value),
    setSearch: (value) => updateFilter('search', value),
    setTag: (value) => updateFilter('tag', value),
    setType: (value) => updateFilter('type', value),
    summary,
    uploadMedia
  };
}

export const mediaManagerDisabledState = {
  description: MEDIA_MANAGER_COPY.uploadUnavailableHelper,
  title: MEDIA_MANAGER_COPY.title
} as const;

export const mediaManagerCategoryVisualTag = MEDIA_TAG_CATEGORY_IMAGE;
