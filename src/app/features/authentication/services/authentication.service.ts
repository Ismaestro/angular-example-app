import { inject, Injectable, signal } from '@angular/core';
import { LOCAL_STORAGE } from '~core/providers/local-storage';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';
import type { LoginRequest } from '~features/authentication/types/login-request.type';
import { environment } from '~environments/environment';
import type {
  LoginResponse,
  LoginResponseData,
} from '~features/authentication/types/login-response.type';
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

const IS_SESSION_ALIVE_KEY = 'isSessionAlive';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly storageService = inject(LOCAL_STORAGE);
  private readonly httpClient = inject(HttpClient);
  private readonly languageService = inject(LanguageService);
  private readonly isUserLoggedInSignal = signal(
    !!this.storageService?.getItem(IS_SESSION_ALIVE_KEY),
  );

  private readonly apiUrl = environment.apiBaseUrl;

  register(registerRequest: RegisterRequest): Observable<RegisterResponseData> {
    const registerEndpoint = `${this.apiUrl}/v1/authentication`;
    return this.httpClient
      .post<RegisterResponse>(
        registerEndpoint,
        {
          email: registerRequest.email,
          password: registerRequest.password,
          name: registerRequest.name,
          favouritePokemonId: registerRequest.favouritePokemonId,
          terms: registerRequest.terms,
        },
        {
          withCredentials: true,
          headers: {
            'Accept-Language': this.languageService.convertLocaleToAcceptLanguage(),
          },
        },
      )
      .pipe(
        map((response: RegisterResponse) => {
          const { data } = response;
          this.storageService?.setItem(IS_SESSION_ALIVE_KEY, 'true');
          this.isUserLoggedInSignal.set(true);
          return data;
        }),
      );
  }

  logIn(loginRequest: LoginRequest): Observable<LoginResponseData> {
    const loginEndpoint = `${this.apiUrl}/v1/authentication/login`;
    return this.httpClient
      .post<LoginResponse>(
        loginEndpoint,
        {
          email: loginRequest.email,
          password: loginRequest.password,
        },
        { withCredentials: true },
      )
      .pipe(
        map((response: LoginResponse) => {
          const { data } = response;
          this.storageService?.setItem(IS_SESSION_ALIVE_KEY, 'true');
          this.isUserLoggedInSignal.set(true);
          return data;
        }),
      );
  }

  refreshToken(): Observable<RefreshTokenResponseData> {
    const refreshTokenEndpoint = `${this.apiUrl}/v1/authentication/token/refresh`;
    return this.httpClient.post<RefreshTokenResponse>(
      refreshTokenEndpoint,
      {},
      { withCredentials: true },
    );
  }

  logOut() {
    this.storageService?.removeItem(IS_SESSION_ALIVE_KEY);
    this.isUserLoggedInSignal.set(false);
  }

  isUserLoggedIn(): boolean {
    return this.isUserLoggedInSignal();
  }
}
