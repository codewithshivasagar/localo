export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginationResponse<T> {
  success: true;
  message: string;
  data: T[];
  meta: PaginationMeta;
}
