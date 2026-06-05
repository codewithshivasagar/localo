import { createCategoriesApi, createHttpClient } from '@localo/api-client';
import { adminApiConfig } from '../../../config';

const adminHttpClient = createHttpClient({
  baseUrl: adminApiConfig.baseUrl
});

const categoriesApi = createCategoriesApi(adminHttpClient);

export const adminCategoriesApi = {
  ...categoriesApi,
  // Compatibility alias for older category feature paths while the admin app settles on the shared API shape.
  listPublic: categoriesApi.list
};
