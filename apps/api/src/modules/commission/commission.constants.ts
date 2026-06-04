export const DEFAULT_COMMISSION_LIST_PAGE = 1;
export const DEFAULT_COMMISSION_LIST_LIMIT = 20;
export const MAX_COMMISSION_LIST_LIMIT = 100;

export const COMMISSION_LEDGER_SORT_FIELDS = [
  'createdAt',
  'dueDate',
  'totalAmount',
  'status'
] as const;

export const COMMISSION_SORT_ORDERS = ['asc', 'desc'] as const;

