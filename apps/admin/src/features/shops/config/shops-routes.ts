export const adminShopRoutes = {
  list: '/shops',
  create: '/shops/new',
  detail: (shopId: string) => `/shops/${shopId}`,
  edit: (shopId: string) => `/shops/${shopId}/edit`
} as const;
