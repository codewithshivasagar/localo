export const adminCategoryRoutes = {
  list: '/categories',
  create: '/categories/new',
  edit: (categoryId: string) => `/categories/${categoryId}/edit`
} as const;

