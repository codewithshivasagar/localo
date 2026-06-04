import type { ApiErrorPayload } from '../types/api-response';

export interface ApiClientErrorOptions {
  status: number;
  statusText: string;
  body?: unknown;
  message?: string;
}

function resolveErrorMessage(options: ApiClientErrorOptions): string {
  if (options.message) {
    return options.message;
  }

  if (
    typeof options.body === 'object' &&
    options.body !== null &&
    'message' in options.body &&
    typeof options.body.message === 'string'
  ) {
    return options.body.message;
  }

  return options.statusText || `API request failed with status ${options.status}`;
}

export class ApiClientError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly body?: unknown;

  constructor(options: ApiClientErrorOptions) {
    super(resolveErrorMessage(options));
    this.name = 'ApiClientError';
    this.status = options.status;
    this.statusText = options.statusText;
    this.body = options.body;
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  get isForbidden(): boolean {
    return this.status === 403;
  }

  get payload(): ApiErrorPayload | undefined {
    if (typeof this.body !== 'object' || this.body === null) {
      return undefined;
    }

    return this.body as ApiErrorPayload;
  }
}
