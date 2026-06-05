import { createHttpClient, createMediaApi } from '@localo/api-client';
import { adminApiConfig } from '../../../config';

const adminHttpClient = createHttpClient({
  baseUrl: adminApiConfig.baseUrl
});

export const adminMediaApi = createMediaApi(adminHttpClient);
