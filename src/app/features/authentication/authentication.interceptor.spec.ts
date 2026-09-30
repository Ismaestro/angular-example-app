import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AlertService } from '~core/services/ui/alert.service';
import { AUTH_URLS } from '~core/constants/urls.constants';
import { AppError } from '~core/enums/app-error.enums';
import { ENVIRONMENT } from '~core/tokens/environment.token';
import { authenticationInterceptor } from '~features/authentication/authentication.interceptor';
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '~features/authentication/constants/authentication.constants';

const API_BASE_URL = 'https://api.test';
const USER_URL = `${API_BASE_URL}/v1/user`;
const REFRESH_URL = `${API_BASE_URL}/v1/authentication/token/refresh`;
const UNAUTHORIZED = { status: 401, statusText: 'Unauthorized' };

describe('authenticationInterceptor', () => {
  let http: HttpClient;
  let httpTesting: HttpTestingController;
  let navigateSpy: ReturnType<typeof vi.spyOn>;

  const expireAccessToken = (url = USER_URL) => {
    httpTesting.expectOne(url).flush({ internalCode: AppError.ACCESS_TOKEN_EXPIRED }, UNAUTHORIZED);
  };

  beforeEach(() => {
    localStorage.setItem(ACCESS_TOKEN_KEY, 'old-access-token');
    localStorage.setItem(REFRESH_TOKEN_KEY, 'refresh-token');

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authenticationInterceptor])),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ENVIRONMENT, useValue: { apiBaseUrl: API_BASE_URL, domain: 'localhost' } },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
    navigateSpy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
  });

  afterEach(() => {
    httpTesting.verify();
    localStorage.clear();
  });

  it('should attach the access token to requests sent to our API', () => {
    http.get(USER_URL).subscribe();

    const request = httpTesting.expectOne(USER_URL);
    expect(request.request.headers.get('Authorization')).toBe('Bearer old-access-token');
    request.flush({});
  });

  it('should NOT send the access token to third-party services', () => {
    const pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/pikachu';
    http.get(pokeApiUrl).subscribe();

    const request = httpTesting.expectOne(pokeApiUrl);
    expect(request.request.headers.has('Authorization')).toBe(false);
    request.flush({});
  });

  it('should refresh the access token, retry the request and keep the refresh token', () => {
    let response: unknown;
    http.get(USER_URL).subscribe((body) => {
      response = body;
    });

    expireAccessToken();
    const refreshRequest = httpTesting.expectOne(REFRESH_URL);
    expect(refreshRequest.request.body).toEqual({ refreshToken: 'refresh-token' });
    expect(refreshRequest.request.headers.has('Authorization')).toBe(false);
    refreshRequest.flush({ ok: true, data: { accessToken: 'new-access-token' } });

    const retriedRequest = httpTesting.expectOne(USER_URL);
    expect(retriedRequest.request.headers.get('Authorization')).toBe('Bearer new-access-token');
    retriedRequest.flush({ ok: true });

    expect(response).toEqual({ ok: true });
    expect(localStorage.getItem(ACCESS_TOKEN_KEY)).toBe('new-access-token');
    expect(localStorage.getItem(REFRESH_TOKEN_KEY)).toBe('refresh-token');
  });

  it('should share a single refresh between concurrent failed requests', () => {
    http.get(USER_URL).subscribe();
    http.get(USER_URL).subscribe();

    for (const request of httpTesting.match(USER_URL)) {
      request.flush({ internalCode: AppError.ACCESS_TOKEN_EXPIRED }, UNAUTHORIZED);
    }
    httpTesting.expectOne(REFRESH_URL).flush({ ok: true, data: { accessToken: 'new-token' } });

    const retriedRequests = httpTesting.match(USER_URL);
    expect(retriedRequests).toHaveLength(2);
    for (const request of retriedRequests) {
      request.flush({});
    }
  });

  it('should end the session when the refresh fails', () => {
    let error: unknown;
    http.get(USER_URL).subscribe({
      error: (requestError: unknown) => {
        error = requestError;
      },
    });

    expireAccessToken();
    httpTesting
      .expectOne(REFRESH_URL)
      .flush({ internalCode: AppError.REFRESH_TOKEN_EXPIRED }, UNAUTHORIZED);

    expect(error).toBeInstanceOf(HttpErrorResponse);
    expect(localStorage.getItem(ACCESS_TOKEN_KEY)).toBeNull();
    expect(localStorage.getItem(REFRESH_TOKEN_KEY)).toBeNull();
    expect(TestBed.inject(AlertService).alerts()).toHaveLength(1);
    expect(navigateSpy).toHaveBeenCalledWith([AUTH_URLS.logIn]);
  });

  it('should propagate any other error without refreshing', () => {
    let error: unknown;
    http.get(USER_URL).subscribe({
      error: (requestError: unknown) => {
        error = requestError;
      },
    });

    httpTesting.expectOne(USER_URL).flush({}, { status: 500, statusText: 'Server Error' });

    httpTesting.expectNone(REFRESH_URL);
    expect((error as HttpErrorResponse).status).toBe(500);
  });
});
