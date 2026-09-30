import { HttpContextToken } from '@angular/common/http';

export const ACCESS_TOKEN_KEY = 'access-token';
export const REFRESH_TOKEN_KEY = 'refresh-token';

/**
 * Marks a request that must bypass the authentication interceptor (e.g. the token refresh itself,
 * which must not trigger another refresh when it fails).
 */
export const SKIP_AUTHENTICATION = new HttpContextToken<boolean>(() => false);
