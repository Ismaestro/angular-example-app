import { inject, Injectable, signal } from '@angular/core';
import { LOCAL_STORAGE } from '~core/providers/local-storage';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';
import type { LoginRequest } from '~features/authentication/types/login-request.type';
import { environment } from '~environments/environment';
import type { LoginResponse } from '~features/authentication/types/login-response.type';
import type {
  RefreshTokenResponse,
  RefreshTokenResponseData,
} from '~features/authentication/types/refresh-token.response.type';
import type { RegisterRequest } from '~features/authentication/types/register-request.type';
import type {
  RegisterResponse,
  RegisterResponseData,
} from '~features/authentication/types/register-response.type';
import { LanguageService } from '~core/services/language.service';
import type { User } from '~features/authentication/types/user.type';

export const ACCESS_TOKEN_KEY = 'access-token';
export const REFRESH_TOKEN_KEY = 'refresh-token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly storageService = inject(LOCAL_STORAGE);
  private readonly httpClient = inject(HttpClient);
  private readonly languageService = inject(LanguageService);
  private readonly isUserLoggedInSignal = signal(!!this.storageService?.getItem(ACCESS_TOKEN_KEY));

  private readonly apiUrl = environment.apiBaseUrl;

  register(registerRequest: RegisterRequest): Observable<RegisterResponseData> {
    const registerEndpoint = `${this.apiUrl}/v1/authentication`;
    return this.httpClient
      .post<RegisterResponse>(
        registerEndpoint,
        {
          email: registerRequest.email.trim().toLowerCase(),
          password: registerRequest.password,
          name: registerRequest.name,
          favouritePokemonId: registerRequest.favouritePokemonId,
          terms: registerRequest.terms,
        },
        {
          headers: {
            'Accept-Language': this.languageService.convertLocaleToAcceptLanguage(),
          },
        },
      )
      .pipe(
        map((response: RegisterResponse) => {
          const { data } = response;
          this.saveTokens(data);
          this.isUserLoggedInSignal.set(true);
          return data;
        }),
      );
  }

  logIn(loginRequest: LoginRequest): Observable<User> {
    const loginEndpoint = `${this.apiUrl}/v1/authentication/login`;
    return this.httpClient
      .post<LoginResponse>(loginEndpoint, {
        email: loginRequest.email.trim().toLowerCase(),
        password: loginRequest.password,
      })
      .pipe(
        map((response: LoginResponse) => {
          const { data } = response;
          this.saveTokens(data);
          this.isUserLoggedInSignal.set(true);
          return data.user;
        }),
      );
  }

  refreshToken(): Observable<RefreshTokenResponseData> {
    const refreshTokenEndpoint = `${this.apiUrl}/v1/authentication/token/refresh`;
    return this.httpClient
      .post<RefreshTokenResponse>(refreshTokenEndpoint, {
        refreshToken: this.storageService?.getItem(REFRESH_TOKEN_KEY),
      })
      .pipe(
        map((response: RefreshTokenResponse) => {
          const { data } = response;
          this.saveTokens(data);
          return data;
        }),
      );
  }

  logOut() {
    this.removeTokens();
    this.isUserLoggedInSignal.set(false);
  }

  isUserLoggedIn(): boolean {
    return this.isUserLoggedInSignal();
  }

  private saveTokens(data: { accessToken: string; refreshToken?: string }) {
    this.storageService?.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    if (data.refreshToken) {
      this.storageService?.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    }
  }

  private removeTokens() {
    this.storageService?.removeItem(ACCESS_TOKEN_KEY);
    this.storageService?.removeItem(REFRESH_TOKEN_KEY);
  }
}
