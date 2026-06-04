export interface StoredAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthTokenStorage {
  getAccessToken(): string | null;
  setAccessToken(token: string | null): void;
  getRefreshToken(): string | null;
  setRefreshToken(token: string | null): void;
  setTokens(tokens: StoredAuthTokens): void;
  clear(): void;
}

const ACCESS_TOKEN_KEY = 'localo.accessToken';
const REFRESH_TOKEN_KEY = 'localo.refreshToken';

export function createMemoryTokenStorage(): AuthTokenStorage {
  let accessToken: string | null = null;
  let refreshToken: string | null = null;

  return {
    getAccessToken: () => accessToken,
    setAccessToken: (token) => {
      accessToken = token;
    },
    getRefreshToken: () => refreshToken,
    setRefreshToken: (token) => {
      refreshToken = token;
    },
    setTokens: (tokens) => {
      accessToken = tokens.accessToken;
      refreshToken = tokens.refreshToken;
    },
    clear: () => {
      accessToken = null;
      refreshToken = null;
    }
  };
}

export function createBrowserTokenStorage(storage: Storage): AuthTokenStorage {
  const setOrRemove = (key: string, token: string | null): void => {
    if (token) {
      storage.setItem(key, token);
      return;
    }

    storage.removeItem(key);
  };

  return {
    getAccessToken: () => storage.getItem(ACCESS_TOKEN_KEY),
    setAccessToken: (token) => setOrRemove(ACCESS_TOKEN_KEY, token),
    getRefreshToken: () => storage.getItem(REFRESH_TOKEN_KEY),
    setRefreshToken: (token) => setOrRemove(REFRESH_TOKEN_KEY, token),
    setTokens: (tokens) => {
      storage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
      storage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    },
    clear: () => {
      storage.removeItem(ACCESS_TOKEN_KEY);
      storage.removeItem(REFRESH_TOKEN_KEY);
    }
  };
}

const memoryTokenStorage = createMemoryTokenStorage();

function getBrowserTokenStorage(): AuthTokenStorage | null {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }

  return createBrowserTokenStorage(window.localStorage);
}

function resolveTokenStorage(): AuthTokenStorage {
  return getBrowserTokenStorage() ?? memoryTokenStorage;
}

export const localoTokenStorage: AuthTokenStorage = {
  getAccessToken: () => resolveTokenStorage().getAccessToken(),
  setAccessToken: (token) => resolveTokenStorage().setAccessToken(token),
  getRefreshToken: () => resolveTokenStorage().getRefreshToken(),
  setRefreshToken: (token) => resolveTokenStorage().setRefreshToken(token),
  setTokens: (tokens) => resolveTokenStorage().setTokens(tokens),
  clear: () => resolveTokenStorage().clear()
};
