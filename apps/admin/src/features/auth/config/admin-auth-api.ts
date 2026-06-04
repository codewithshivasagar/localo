import { createAuthApi, createHttpClient } from '@localo/api-client';
import { adminApiConfig } from '../../../config';

export const adminAuthApi = createAuthApi(
  createHttpClient({
    baseUrl: adminApiConfig.baseUrl
  })
);
