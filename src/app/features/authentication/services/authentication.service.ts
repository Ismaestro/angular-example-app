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

const IS_SESSION_ALIVE = 'isSessionAlive';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly storageService = inject(LOCAL_STORAGE);
  private readonly httpClient = inject(HttpClient);
  private readonly isUserLoggedInSignal = signal(!!this.storageService?.getItem(IS_SESSION_ALIVE));

  private readonly apiUrl = environment.apiBaseUrl;

  isUserLoggedIn(): boolean {
    return this.isUserLoggedInSignal();
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
          this.storageService?.setItem(IS_SESSION_ALIVE, 'true');
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
    this.storageService?.removeItem(IS_SESSION_ALIVE);
    this.isUserLoggedInSignal.set(false);
  }
}
