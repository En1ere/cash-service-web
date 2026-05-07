const TOKEN_KEYS = {
    ACCESS: 'accessToken',
    REFRESH: 'refreshToken',
} as const;

const getFromStorage = (key: string): string | null => localStorage.getItem(key);
const setToStorage = (key: string, value: string): void => localStorage.setItem(key, value);
const removeFromStorage = (key: string): void => localStorage.removeItem(key);

export const getAccessToken = (): string | null => getFromStorage(TOKEN_KEYS.ACCESS);
export const getRefreshToken = (): string | null => getFromStorage(TOKEN_KEYS.REFRESH);

export const setAuthTokens = (accessToken: string, refreshToken?: string): void => {
    setToStorage(TOKEN_KEYS.ACCESS, accessToken);
    if(refreshToken) {
        setToStorage(TOKEN_KEYS.REFRESH, refreshToken);
    }
};

export const clearTokens = (): void => {
    removeFromStorage(TOKEN_KEYS.ACCESS);
    removeFromStorage(TOKEN_KEYS.REFRESH);
};