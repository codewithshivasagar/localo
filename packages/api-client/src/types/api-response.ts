import type { PaginationMeta } from './pagination';

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };
export type ApiRecord = Record<string, unknown>;

export interface ApiErrorPayload {
  code?: string;
  message?: string;
  details?: unknown;
}

export interface ApiEnvelope<TData> {
  success: boolean;
  message: string;
  data: TData;
  meta?: PaginationMeta;
  error?: ApiErrorPayload | string | null;
}

export interface ApiListEnvelope<TItem> extends ApiEnvelope<TItem[]> {
  meta?: PaginationMeta;
}
