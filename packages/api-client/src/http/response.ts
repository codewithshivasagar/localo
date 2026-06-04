import { ApiClientError } from './api-error';
import type { ApiEnvelope } from '../types/api-response';
import type { PaginatedResult } from '../types/pagination';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isApiEnvelope<TData>(value: unknown): value is ApiEnvelope<TData> {
  return isObject(value) && 'success' in value && 'message' in value && 'data' in value;
}

export function unwrapApiResponse<TData>(value: unknown, fallbackStatus = 500): {
  data: TData;
  message: string;
  meta: ApiEnvelope<TData>['meta'];
} {
  if (!isApiEnvelope<TData>(value)) {
    return {
      data: value as TData,
      message: '',
      meta: undefined
    };
  }

  if (!value.success) {
    throw new ApiClientError({
      status: fallbackStatus,
      statusText: 'API Error',
      body: value.error ?? value
    });
  }

  return {
    data: value.data,
    message: value.message,
    meta: value.meta
  };
}

export function unwrapPaginatedResponse<TItem>(value: unknown): PaginatedResult<TItem> {
  const response = unwrapApiResponse<TItem[]>(value);

  return {
    data: response.data,
    message: response.message,
    meta: response.meta
  };
}
