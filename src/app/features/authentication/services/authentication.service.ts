import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { finalize, map, shareReplay, type Observable } from 'rxjs';
import { LOCAL_STORAGE } from '~core/providers/local-storage';
import { LanguageService } from '~core/services/language.service';
import { HttpCacheService } from '~core/services/http-cache.service';
import { getEndpoints } from '~core/constants/endpoints.constants';
import type { LoginRequest } from '~features/authentication/types/login-request.types';
import type { LoginResponse } from '~features/authentication/types/login-response.types';
import type { RefreshTokenResponse } from '~features/authentication/types/refresh-token.response.types';
import type {
  RegisterResponse,
  RegisterResponseData,
} from '~features/authentication/types/register-response.types';
import type { RegisterFormValue } from '~features/authentication/pages/register/register-form.types';
import type { User } from '~features/authentication/types/user.types';
import type { AuthTokens } from '~features/authentication/types/authentication.types';

import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  SKIP_AUTHENTICATION,
} from '~features/authentication/constants/authentication.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly endpoints = getEndpoints();
  private readonly http = inject(HttpClient);
  private readonly storageService = inject(LOCAL_STORAGE);
  private readonly languageService = inject(LanguageService);
  private readonly httpCache = inject(HttpCacheService);

  private readonly authTokens = signal<AuthTokens>({
    accessToken: this.storageService?.getItem(ACCESS_TOKEN_KEY) ?? undefined,
    refreshToken: this.storageService?.getItem(REFRESH_TOKEN_KEY) ?? undefined,
  });

  private accessTokenRefresh$: Observable<string> | undefined;

  readonly authState = computed(() => {
    const { accessToken, refreshToken } = this.authTokens();
    return {
      isLoggedIn: !!accessToken,
      hasRefreshToken: !!refreshToken,
      accessToken,
      refreshToken,
    };
  });

  register(registerRequest: RegisterFormValue): Observable<RegisterResponseData> {
    const payload = {
      ...registerRequest,
      email: registerRequest.email.toLowerCase(),
    };

    return this.handleAuthResponse(
      this.http.post<RegisterResponse>(this.endpoints.auth.v1.authentication, payload, {
        headers: {
          'Accept-Language': this.languageService.convertLocaleToAcceptLanguage(),
        },
      }),
    );
  }

  logIn(loginRequest: LoginRequest): Observable<User> {
    const payload = {
      email: loginRequest.email.toLowerCase(),
      password: loginRequest.password,
    };

    return this.handleAuthResponse(
      this.http.post<LoginResponse>(this.endpoints.auth.v1.login, payload),
    ).pipe(map((data) => data.user));
  }

  /**
   * Requests a new access token and returns it. Concurrent callers share the same in-flight
   * request, so a burst of 401 responses results in a single refresh.
   */
  refreshAccessToken(): Observable<string> {
    this.accessTokenRefresh$ ??= this.handleAuthResponse(
      this.http.post<RefreshTokenResponse>(
        this.endpoints.auth.v1.refreshToken,
        { refreshToken: this.authTokens().refreshToken },
        { context: new HttpContext().set(SKIP_AUTHENTICATION, true) },
      ),
    ).pipe(
      map(({ accessToken }) => accessToken),
      finalize(() => {
        this.accessTokenRefresh$ = undefined;
      }),
      shareReplay({ bufferSize: 1, refCount: false }),
    );

    return this.accessTokenRefresh$;
  }

  logOut() {
    this.httpCache.clear();
    this.removeTokens();
  }

  private handleAuthResponse<T extends { data: { accessToken: string; refreshToken?: string } }>(
    request$: Observable<T>,
  ): Observable<T['data']> {
    return request$.pipe(
      map((response) => {
        this.saveTokens(response.data);
        return response.data;
      }),
    );
  }

  private saveTokens({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken?: string;
  }): void {
    this.storageService?.setItem(ACCESS_TOKEN_KEY, accessToken);
    // The refresh endpoint only returns a new access token: the current refresh token must be kept
    if (refreshToken) {
      this.storageService?.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
    this.authTokens.update((tokens) => ({
      accessToken,
      refreshToken: refreshToken ?? tokens.refreshToken,
    }));
  }

  private removeTokens(): void {
    this.storageService?.removeItem(ACCESS_TOKEN_KEY);
    this.storageService?.removeItem(REFRESH_TOKEN_KEY);
    this.authTokens.set({ accessToken: undefined, refreshToken: undefined });
  }
}
