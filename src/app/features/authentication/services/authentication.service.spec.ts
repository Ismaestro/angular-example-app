import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpCacheService } from '~core/services/http-cache.service';
import { ENVIRONMENT } from '~core/tokens/environment.token';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '~features/authentication/constants/authentication.constants';

const API_BASE_URL = 'https://api.test';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ENVIRONMENT, useValue: { apiBaseUrl: API_BASE_URL, domain: 'localhost' } },
      ],
    });

    service = TestBed.inject(AuthenticationService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
    localStorage.clear();
  });

  it('should start logged out when there are no stored tokens', () => {
    expect(service.authState().isLoggedIn).toBe(false);
  });

  it('should store the tokens and update the auth state after logging in', () => {
    service.logIn({ email: 'Ash@Pallet.com', password: 'Pikachu123' }).subscribe();

    const request = httpTesting.expectOne(`${API_BASE_URL}/v1/authentication/login`);
    expect(request.request.body).toEqual({ email: 'ash@pallet.com', password: 'Pikachu123' });
    request.flush({ ok: true, data: { accessToken: 'access', refreshToken: 'refresh', user: {} } });

    expect(service.authState()).toEqual({
      isLoggedIn: true,
      hasRefreshToken: true,
      accessToken: 'access',
      refreshToken: 'refresh',
    });
    expect(localStorage.getItem(ACCESS_TOKEN_KEY)).toBe('access');
    expect(localStorage.getItem(REFRESH_TOKEN_KEY)).toBe('refresh');
  });

  it('should clear the tokens and the HTTP cache when logging out', () => {
    const httpCache = TestBed.inject(HttpCacheService);
    httpCache.set('/v1/user', new HttpResponse({ status: 200 }));
    localStorage.setItem(ACCESS_TOKEN_KEY, 'access');

    service.logOut();

    expect(service.authState().isLoggedIn).toBe(false);
    expect(localStorage.getItem(ACCESS_TOKEN_KEY)).toBeNull();
    expect(httpCache.get('/v1/user')).toBeUndefined();
  });
});
