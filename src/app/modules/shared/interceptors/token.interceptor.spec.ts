import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '~modules/auth/shared/auth.service';
import { TestBed } from '@angular/core/testing';
import { TokenInterceptor } from '~modules/shared/interceptors/token.interceptor';
import { AuthRepository } from '~modules/auth/store/auth.repository';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

// eslint-disable-next-line max-lines-per-function
describe('AuthHttpInterceptor', () => {
  let httpClient: HttpClient;
  let controller: HttpTestingController;

  const authServiceSpy = jasmine.createSpyObj('AuthService', {
    refreshToken: of(true),
  });
  const authRepositorySpy = jasmine.createSpyObj('AuthRepository', {
    getAccessTokenValue: 'accessToken',
    getRefreshTokenValue: 'refreshToken',
  });
  const routerSpy = jasmine.createSpyObj('Router', {
    navigate: () => new Promise<void>(resolve => resolve()),
  });

  // eslint-disable-next-line max-lines-per-function
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
        {
          provide: AuthRepository,
          useValue: authRepositorySpy,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
          deps: [Router, AuthService, AuthRepository, DOCUMENT],
        },
        {
          provide: Document,
          useValue: {
            defaultView: {
              location: { href: 'localhost:4200' },
            },
          },
        },
      ],
    });
    AuthService.decodeToken = (token: string) =>
      token === 'access' ? { exp: 167498413 } : { exp: Date.now() };
    httpClient = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
    authServiceSpy.refreshToken.calls.reset();
    routerSpy.navigate.calls.reset();
  });

  it('should handle get request', async () => {
    httpClient.get('/test1').subscribe(response => {
      expect(response).toEqual({ camel_case: true });
      expect(authServiceSpy.refreshToken).not.toHaveBeenCalled();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
    const request = controller.expectOne('/test1');
    request.flush({ camel_case: true });
    expect(request.request.headers.get('Authorization')).toBe('Bearer accessToken');
  });

  it('should navigate to logout because 401 error', async () => {
    httpClient.get('/test2').subscribe(() => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/logout'], {
        queryParams: {
          origin: 'http%3A%2F%2Flocalhost%3A9876%2Fcontext.html',
          alertId: 'SESSION_EXPIRED',
        },
      });
    });
    const request = controller.expectOne('/test2');
    request.flush({ errors: [{ code: 401 }] });
  });

  it('should update token expired', async () => {
    authRepositorySpy.getAccessTokenValue.and.returnValue('access');
    authRepositorySpy.getRefreshTokenValue.and.returnValue('refresh');
    httpClient.get('/test3').subscribe(response => {
      expect(response).toEqual({ camel_case: true });
      expect(authServiceSpy.refreshToken).toHaveBeenCalled();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
    const request = controller.expectOne('/test3');
    request.flush({ camel_case: true });
    expect(request.request.headers.get('Authorization')).toBe('Bearer access');
  });

  it('should navigate to logout because update token failed', async () => {
    authRepositorySpy.getAccessTokenValue.and.returnValue('access');
    authRepositorySpy.getRefreshTokenValue.and.returnValue('refresh');
    authServiceSpy.refreshToken.and.returnValue(throwError(() => true));
    httpClient.get('/test4').subscribe();
    controller.expectNone('/test4');
    expect(authServiceSpy.refreshToken).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/logout'], {
      queryParams: {
        origin: 'http%3A%2F%2Flocalhost%3A9876%2Fcontext.html',
        alertId: 'SESSION_EXPIRED',
      },
    });
  });

  afterEach(() => {
    controller.verify();
  });
});
