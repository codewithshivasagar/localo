import { ApiClientError } from './api-error';
import { localoTokenStorage } from './auth-token';
import { toQueryString, type QueryParams } from './query-params';
import { unwrapApiResponse, unwrapPaginatedResponse } from './response';
import type { PaginatedResult } from '../types/pagination';

export interface HttpClientOptions {
  baseUrl?: string;
  fetcher?: typeof fetch;
  getAccessToken?: () => Promise<string | null> | string | null;
  headers?: HeadersInit;
  onUnauthorized?: (error: ApiClientError) => Promise<void> | void;
}

export interface RequestOptions<TBody = unknown> {
  body?: TBody;
  headers?: HeadersInit;
  method?: string;
  query?: QueryParams;
}

export interface HttpClient {
  request<TData, TBody = unknown>(path: string, options?: RequestOptions<TBody>): Promise<TData>;
  get<TData>(path: string, query?: QueryParams): Promise<TData>;
  getPaginated<TItem>(path: string, query?: QueryParams): Promise<PaginatedResult<TItem>>;
  post<TData, TBody = unknown>(path: string, body?: TBody, query?: QueryParams): Promise<TData>;
  patch<TData, TBody = unknown>(path: string, body?: TBody, query?: QueryParams): Promise<TData>;
  put<TData, TBody = unknown>(path: string, body?: TBody, query?: QueryParams): Promise<TData>;
  delete<TData>(path: string, query?: QueryParams): Promise<TData>;
}

type LocaloGlobal = typeof globalThis & {
  process?: {
    env?: Record<string, string | undefined>;
  };
  __LOCALO_API_BASE_URL__?: string;
};

function readDefaultBaseUrl(): string {
  const localoGlobal = globalThis as LocaloGlobal;

  // Apps may pass baseUrl explicitly; these fallbacks keep package imports safe in SSR/browser contexts.
  return (
    localoGlobal.__LOCALO_API_BASE_URL__ ??
    localoGlobal.process?.env?.NEXT_PUBLIC_API_BASE_URL ??
    localoGlobal.process?.env?.VITE_API_BASE_URL ??
    ''
  );
}

function joinUrl(baseUrl: string, path: string, query?: QueryParams): string {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${normalizedBaseUrl}${normalizedPath}${toQueryString(query)}`;
}

function isJsonBody(body: unknown): boolean {
  return !(
    (typeof FormData !== 'undefined' && body instanceof FormData) ||
    (typeof Blob !== 'undefined' && body instanceof Blob) ||
    (typeof URLSearchParams !== 'undefined' && body instanceof URLSearchParams)
  );
}

async function parseResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return undefined;
  }

  const text = await response.text();

  if (!text) {
    return undefined;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function mergeHeaders(...headers: (HeadersInit | undefined)[]): Headers {
  const merged = new Headers();

  for (const headerSet of headers) {
    if (!headerSet) {
      continue;
    }

    new Headers(headerSet).forEach((value, key) => {
      merged.set(key, value);
    });
  }

  return merged;
}

export function createHttpClient(options: HttpClientOptions = {}): HttpClient {
  const baseUrl = options.baseUrl ?? readDefaultBaseUrl();
  const fetcher = options.fetcher ?? fetch.bind(globalThis);

  const requestEnvelope = async <TBody = unknown>(
    path: string,
    requestOptions: RequestOptions<TBody> = {}
  ): Promise<unknown> => {
    const token = await (options.getAccessToken?.() ?? localoTokenStorage.getAccessToken());
    const headers = mergeHeaders(options.headers, requestOptions.headers);
    const body = requestOptions.body;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    if (body !== undefined && isJsonBody(body) && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetcher(joinUrl(baseUrl, path, requestOptions.query), {
      method: requestOptions.method ?? 'GET',
      headers,
      body:
        body === undefined ? undefined : isJsonBody(body) ? JSON.stringify(body) : (body as BodyInit)
    });

    const responseBody = await parseResponseBody(response);

    if (!response.ok) {
      const error = new ApiClientError({
        status: response.status,
        statusText: response.statusText,
        body: responseBody
      });

      if (error.isUnauthorized) {
        await options.onUnauthorized?.(error);
      }

      throw error;
    }

    return responseBody;
  };

  const request = async <TData, TBody = unknown>(
    path: string,
    requestOptions: RequestOptions<TBody> = {}
  ): Promise<TData> => {
    const responseBody = await requestEnvelope(path, requestOptions);

    return unwrapApiResponse<TData>(responseBody).data;
  };

  return {
    request,
    get: (path, query) => request(path, { method: 'GET', query }),
    getPaginated: async (path, query) =>
      unwrapPaginatedResponse(await requestEnvelope(path, { method: 'GET', query })),
    post: (path, body, query) => request(path, { method: 'POST', body, query }),
    patch: (path, body, query) => request(path, { method: 'PATCH', body, query }),
    put: (path, body, query) => request(path, { method: 'PUT', body, query }),
    delete: (path, query) => request(path, { method: 'DELETE', query })
  };
}

export const apiClient = createHttpClient();
