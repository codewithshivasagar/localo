export type SortOrder = 'asc' | 'desc';

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResult<TItem> {
  data: TItem[];
  meta?: PaginationMeta;
  message: string;
}
