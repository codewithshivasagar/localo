export interface NormalizedPagination {
  limit: number;
  page: number;
  skip: number;
  take: number;
}

export interface PaginationNormalizationOptions {
  defaultLimit: number;
  defaultPage?: number;
  maxLimit: number;
  minLimit?: number;
  minPage?: number;
}

function toPositiveInteger(value: unknown, fallback: number): number {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? Math.trunc(parsed) : fallback;
}

export function normalizePagination(
  page: unknown,
  limit: unknown,
  options: PaginationNormalizationOptions
): NormalizedPagination {
  const minPage = options.minPage ?? 1;
  const minLimit = options.minLimit ?? 1;
  const defaultPage = options.defaultPage ?? 1;
  const normalizedPage = Math.max(minPage, toPositiveInteger(page, defaultPage));
  const normalizedLimit = Math.min(
    options.maxLimit,
    Math.max(minLimit, toPositiveInteger(limit, options.defaultLimit))
  );

  return {
    page: normalizedPage,
    limit: normalizedLimit,
    skip: (normalizedPage - 1) * normalizedLimit,
    take: normalizedLimit
  };
}

