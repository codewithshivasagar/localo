import { Permission, ShopUserRole } from "@localo/constants";

const rolePermissions: Record<ShopUserRole, Permission[]> = {
  [ShopUserRole.SHOP_OWNER]: Object.values(Permission),
  [ShopUserRole.SHOP_ORDER_MANAGER]: [
    Permission.VIEW_ORDERS,
    Permission.ACCEPT_ORDERS,
    Permission.UPDATE_ORDER_STATUS
  ],
  [ShopUserRole.SHOP_PRODUCT_MANAGER]: [
    Permission.VIEW_ORDERS,
    Permission.ACCEPT_ORDERS,
    Permission.UPDATE_ORDER_STATUS,
    Permission.VIEW_PRODUCTS,
    Permission.EDIT_PRODUCTS
  ],
  [ShopUserRole.SHOP_CATALOG_MANAGER]: [
    Permission.VIEW_ORDERS,
    Permission.ACCEPT_ORDERS,
    Permission.UPDATE_ORDER_STATUS,
    Permission.VIEW_PRODUCTS,
    Permission.CREATE_PRODUCTS,
    Permission.EDIT_PRODUCTS,
    Permission.DELETE_PRODUCTS
  ]
};

export function hasShopPermission(role: ShopUserRole, permission: Permission) {
  return rolePermissions[role]?.includes(permission) ?? false;
}
