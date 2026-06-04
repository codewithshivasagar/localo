export const DEFAULT_SUPPORT_TICKET_LIST_PAGE = 1;
export const DEFAULT_SUPPORT_TICKET_LIST_LIMIT = 20;
export const MAX_SUPPORT_TICKET_LIST_LIMIT = 100;

export const SUPPORT_TICKET_SORT_FIELDS = [
  'createdAt',
  'updatedAt',
  'priority',
  'status'
] as const;

export const SUPPORT_TICKET_SORT_ORDERS = ['asc', 'desc'] as const;

