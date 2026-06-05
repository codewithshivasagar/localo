'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { MediaResponse } from '@localo/api-client';
import { adminApiConfig } from '../../../config';
import { adminMediaApi } from '../../media/config/admin-media-api';
import { MEDIA_TAG_CATEGORY_IMAGE } from '../../media/config/media.constants';

export interface UseCategoryVisualMediaResult {
  error: string | null;
  isApiAvailable: boolean;
  isLoading: boolean;
  media: MediaResponse[];
  refresh: () => void;
  search: string;
  selectedMedia: MediaResponse | null;
  setSearch: (value: string) => void;
}

function isVisualMedia(media: MediaResponse) {
  return media.type === 'image' || media.type === 'svg';
}

function toErrorMessage(error: unknown) {
  return error instanceof Error && error.message ? error.message : 'Unable to load category visuals.';
}

export function useCategoryVisualMedia(selectedMediaId?: string): UseCategoryVisualMediaResult {
  const [search, setSearch] = useState('');
  const [media, setMedia] = useState<MediaResponse[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const isApiAvailable = Boolean(adminApiConfig.baseUrl);

  const loadMedia = useCallback(async () => {
    if (!isApiAvailable) {
      setMedia([]);
      setSelectedMedia(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await adminMediaApi.list({
        limit: 24,
        page: 1,
        search: search || undefined,
        tag: MEDIA_TAG_CATEGORY_IMAGE,
        type: 'all'
      });

      const nextMedia = response.data.filter(isVisualMedia);
      setMedia(nextMedia);
    } catch (nextError) {
      setMedia([]);
      setSelectedMedia(null);
      setError(toErrorMessage(nextError));
    } finally {
      setIsLoading(false);
    }
  }, [isApiAvailable, search]);

  useEffect(() => {
    setIsLoading(true);
    void loadMedia();
  }, [loadMedia, refreshKey]);

  useEffect(() => {
    if (!selectedMediaId) {
      setSelectedMedia(null);
      return;
    }

    const matchedMedia = media.find((item) => item.id === selectedMediaId);
    if (matchedMedia) {
      setSelectedMedia(matchedMedia);
      return;
    }

    if (!isApiAvailable) {
      setSelectedMedia(null);
      return;
    }

    let isMounted = true;

    adminMediaApi
      .get(selectedMediaId)
      .then((result) => {
        if (!isMounted || !isVisualMedia(result)) {
          return;
        }

        setSelectedMedia(result);
      })
      .catch(() => {
        if (isMounted) {
          setSelectedMedia(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isApiAvailable, media, selectedMediaId]);

  const refresh = useCallback(() => {
    setIsLoading(true);
    setRefreshKey((currentKey) => currentKey + 1);
  }, []);

  return useMemo(
    () => ({
      error,
      isApiAvailable,
      isLoading,
      media,
      refresh,
      search,
      selectedMedia,
      setSearch
    }),
    [error, isApiAvailable, isLoading, media, refresh, search, selectedMedia]
  );
}
