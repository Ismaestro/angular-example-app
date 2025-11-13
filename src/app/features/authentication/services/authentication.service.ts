import { inject, Injectable, linkedSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, type Observable } from 'rxjs';
import { LOCAL_STORAGE } from '~core/providers/local-storage';
import { LanguageService } from '~core/services/language.service';
import { clearCache } from '~core/interceptors/caching.interceptor';
import { getEndpoints } from '~core/constants/endpoints.constants';
import type { LoginRequest } from '~features/authentication/types/login-request.type';
import type { LoginResponse } from '~features/authentication/types/login-response.type';
import type {
  RefreshTokenResponse,
  RefreshTokenResponseData,
} from '~features/authentication/types/refresh-token.response.type';
import type {
  RegisterResponse,
  RegisterResponseData,
} from '~features/authentication/types/register-response.type';
import type { RegisterFormValue } from '~features/authentication/pages/register/register-form.types';
import type { User } from '~features/authentication/types/user.type';
import type { AuthTokens } from '~features/authentication/types/authentication.types';

export const ACCESS_TOKEN_KEY = 'access-token';
export const REFRESH_TOKEN_KEY = 'refresh-token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly endpoints = getEndpoints();
  private readonly httpClient = inject(HttpClient);
  private readonly storageService = inject(LOCAL_STORAGE);
  private readonly languageService = inject(LanguageService);

  private readonly authTokens = signal<AuthTokens>({
    accessToken: this.storageService?.getItem(ACCESS_TOKEN_KEY) ?? undefined,
    refreshToken: this.storageService?.getItem(REFRESH_TOKEN_KEY) ?? undefined,
  });

  readonly authState = linkedSignal({
    source: this.authTokens,
    computation: (tokens) => ({
      isLoggedIn: !!tokens.accessToken,
      hasRefreshToken: !!tokens.refreshToken,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }),
  });

  register(registerRequest: RegisterFormValue): Observable<RegisterResponseData> {
    const payload = {
      ...registerRequest,
      email: registerRequest.email.toLowerCase(),
    };

    return this.handleAuthResponse(
      this.httpClient.post<RegisterResponse>(this.endpoints.auth.v1.authentication, payload, {
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
      this.httpClient.post<LoginResponse>(this.endpoints.auth.v1.login, payload),
    ).pipe(map((data) => data.user));
  }

  refreshToken(): Observable<RefreshTokenResponseData> {
    const refreshToken = this.storageService?.getItem(REFRESH_TOKEN_KEY);

    return this.handleAuthResponse(
      this.httpClient.post<RefreshTokenResponse>(this.endpoints.auth.v1.refreshToken, {
        refreshToken,
      }),
    );
  }

  logOut() {
    clearCache();
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
    this.storageService?.setItem(REFRESH_TOKEN_KEY, refreshToken ?? '');
    this.authTokens.set({ accessToken, refreshToken });
  }

  private removeTokens(): void {
    this.storageService?.removeItem(ACCESS_TOKEN_KEY);
    this.storageService?.removeItem(REFRESH_TOKEN_KEY);
    this.authTokens.set({ accessToken: undefined, refreshToken: undefined });
  }
}
