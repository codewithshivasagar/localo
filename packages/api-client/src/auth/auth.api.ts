import { apiClient, type HttpClient } from '../http/http-client';
import { localoTokenStorage } from '../http/auth-token';
import type { AuthSession, AuthUser, LoginRequest, LogoutRequest, RefreshTokenRequest } from './auth.types';

export function createAuthApi(client: HttpClient = apiClient) {
  return {
    async login(body: LoginRequest): Promise<AuthSession> {
      const session = await client.post<AuthSession, LoginRequest>('/auth/login', body);
      localoTokenStorage.setTokens(session.tokens);
      return session;
    },

    async refresh(body: RefreshTokenRequest): Promise<AuthSession> {
      const session = await client.post<AuthSession, RefreshTokenRequest>('/auth/refresh', body);
      localoTokenStorage.setTokens(session.tokens);
      return session;
    },

    async logout(body: LogoutRequest): Promise<void> {
      await client.post<void, LogoutRequest>('/auth/logout', body);
      localoTokenStorage.clear();
    },

    me(): Promise<AuthUser> {
      return client.get<AuthUser>('/users/me');
    }
  };
}

export const authApi = createAuthApi();
