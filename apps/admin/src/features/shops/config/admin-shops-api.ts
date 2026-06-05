import { createCategoriesApi, createHttpClient, createShopsApi } from '@localo/api-client';
import { adminApiConfig } from '../../../config';

const adminHttpClient = createHttpClient({
  baseUrl: adminApiConfig.baseUrl
});

export const adminCategoriesApi = createCategoriesApi(adminHttpClient);
export const adminShopsApi = createShopsApi(adminHttpClient);
