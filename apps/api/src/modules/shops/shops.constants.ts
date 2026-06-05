import { Role } from '@localo/shared-types';

export const ADMIN_SHOP_ROLES = [Role.SUPER_ADMIN, Role.ADMIN] as const;

export const DEFAULT_SHOP_LIST_PAGE = 1;
export const DEFAULT_SHOP_LIST_LIMIT = 10;
export const MAX_SHOP_LIST_LIMIT = 100;
