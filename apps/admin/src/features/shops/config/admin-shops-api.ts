import { createHttpClient, createShopsApi } from '@localo/api-client';
import { adminApiConfig } from '../../../config';

export const adminShopsApi = createShopsApi(
  createHttpClient({
    baseUrl: adminApiConfig.baseUrl
  })
);
