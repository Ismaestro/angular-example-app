import type { HttpHandlerFn } from '@angular/common/http';
import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { AlertService } from '~core/services/ui/alert.service';
import { LOCAL_STORAGE } from '~core/providers/local-storage';
import { AUTH_URLS } from '~core/constants/urls.constants';
import { AppError } from '~core/enums/app-error.enums';
import { authenticationInterceptor } from '~features/authentication/authentication.interceptor';

describe('authenticationInterceptor', () => {
  let mockAuthService: { refreshToken: ReturnType<typeof vi.fn>; logOut: ReturnType<typeof vi.fn> };
  let mockAlertService: { createErrorAlert: ReturnType<typeof vi.fn> };
  let mockStorageService: { getItem: ReturnType<typeof vi.fn> };
  let mockRouter: { navigate: ReturnType<typeof vi.fn> };
  let next: HttpHandlerFn;

  beforeEach(() => {
    mockAuthService = {
      refreshToken: vi.fn(),
      logOut: vi.fn(),
    };
    mockAlertService = {
      createErrorAlert: vi.fn(),
    };
    mockStorageService = {
      getItem: vi.fn(),
    };
    mockRouter = {
      navigate: vi.fn(),
    };
    next = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: mockAuthService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: LOCAL_STORAGE, useValue: mockStorageService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should attach Authorization header if token exists', () => {
    mockStorageService.getItem.mockReturnValue('fake-token');
    const request = new HttpRequest('GET', '/api/data');
    next = (httpRequest: HttpRequest<unknown>) => {
      expect(httpRequest.headers.get('Authorization')).toBe('Bearer fake-token');
      return of(new HttpResponse({ status: 200 }));
    };

    TestBed.runInInjectionContext(() => {
      authenticationInterceptor(request, next).subscribe();
    });
  });

  it('should handle 401 Access Token Expired and retry after refresh', () => {
    mockStorageService.getItem.mockReturnValue('old-token');
    const request = new HttpRequest('GET', '/api/data');

    const errorResponse = new HttpErrorResponse({
      error: { internalCode: AppError.ACCESS_TOKEN_EXPIRED },
      status: 401,
    });

    let callCount = 0;
    next = (httpRequest: HttpRequest<unknown>) => {
      callCount += 1;
      if (callCount === 1) {
        return throwError(() => errorResponse);
      }
      expect(httpRequest.headers.get('Authorization')).toBe('Bearer new-token');
      return of(new HttpResponse({ status: 200 }));
    };

    mockAuthService.refreshToken.mockReturnValue(of({ accessToken: 'new-token' }));
    /* eslint-disable @typescript-eslint/strict-void-return */
    mockStorageService.getItem.mockImplementation((key: string) => {
      if (key === 'access-token' && callCount > 0) {
        return 'new-token';
      }
      return 'old-token';
    });
    /* eslint-enable @typescript-eslint/strict-void-return */

    TestBed.runInInjectionContext(() => {
      authenticationInterceptor(request, next).subscribe();
    });

    expect(mockAuthService.refreshToken).toHaveBeenCalled();
  });

  it('should logout and redirect on Refresh Token Expired', () => {
    const request = new HttpRequest('GET', '/api/data');
    const errorResponse = new HttpErrorResponse({
      error: { internalCode: AppError.REFRESH_TOKEN_EXPIRED },
      status: 401,
    });

    next = () => throwError(() => errorResponse);

    TestBed.runInInjectionContext(() => {
      authenticationInterceptor(request, next).subscribe({
        error: (error) => {
          expect(error.message).toContain('Session expired');
        },
      });
    });

    expect(mockAuthService.logOut).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith([AUTH_URLS.logIn]);
  });
});
