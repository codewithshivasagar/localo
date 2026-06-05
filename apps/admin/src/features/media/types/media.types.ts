import type { PaginationMeta } from '@localo/api-client';

export type MediaType = 'image' | 'svg' | 'document' | 'other';

export type MediaTypeFilter = 'all' | 'images' | 'svgs' | 'documents';

export interface MediaRecord {
  id: string;
  filename: string;
  title?: string | null;
  altText?: string | null;
  mimeType: string;
  publicUrl?: string | null;
  sizeBytes?: number | null;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
  type: MediaType;
}

export interface MediaManagerFilterState {
  search: string;
  tag: string;
  type: MediaTypeFilter;
  page: number;
  limit: number;
}

export interface MediaSummary {
  documents: number;
  images: number;
  svgs: number;
  total: number;
}

export interface MediaListResponse {
  data: MediaRecord[];
  message: string;
  meta?: PaginationMeta;
}
