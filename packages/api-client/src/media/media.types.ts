import type { ApiRecord } from '../types/api-response';
import type { PaginationQuery } from '../types/pagination';

export type MediaTypeFilter = 'all' | 'images' | 'svgs' | 'documents';
export type MediaAssetType = 'image' | 'svg' | 'document' | 'other';

export interface MediaResponse {
  id: string;
  filename: string;
  title?: string | null;
  altText?: string | null;
  publicUrl?: string | null;
  mimeType: string;
  sizeBytes?: number | null;
  tags: string[];
  type: MediaAssetType;
  createdAt: string;
}

export interface MediaFilterQuery extends PaginationQuery {
  search?: string;
  type?: MediaTypeFilter;
  tag?: string;
}

export type UpdateMediaRequest = ApiRecord & {
  title?: string;
  altText?: string;
  tags?: string;
};
