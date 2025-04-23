import type {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import type { Observable } from 'rxjs';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ACCESS_TOKEN_KEY,
  AuthenticationService,
} from '~features/authentication/services/authentication.service';
import { AppError } from '~core/enums/app-error.enum';
import { AUTH_URLS } from '~core/constants/urls.constants';
import { LOCAL_STORAGE } from '~core/providers/local-storage';
import { translations } from '../../../locale/translations';
import { AlertStore } from '~core/services/ui/alert.store';

const isRefreshing = new BehaviorSubject<boolean>(false);

export function authenticationInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const authenticationService = inject(AuthenticationService);
  const alertStore = inject(AlertStore);
  const storageService = inject(LOCAL_STORAGE);
  const router = inject(Router);

  const clonedRequest = attachAccessToken(request, storageService);
  return handleRequest({
    request: clonedRequest,
    next,
    authenticationService,
    alertStore,
    storageService,
    router,
  });
}

function attachAccessToken(
  request: HttpRequest<unknown>,
  storageService: Storage | null,
): HttpRequest<unknown> {
  const accessToken = storageService?.getItem(ACCESS_TOKEN_KEY);
  if (accessToken) {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` },
    });
  }
  return request;
}

function handleRequest(parameters: {
  request: HttpRequest<unknown>;
  next: HttpHandlerFn;
  authenticationService: AuthenticationService;
  alertStore: AlertStore;
  storageService: Storage | null;
  router: Router;
}): Observable<HttpEvent<unknown>> {
  return parameters.next(parameters.request).pipe(
    catchError((errorResponse: HttpErrorResponse) =>
      handleErrors({
        errorResponse,
        ...parameters,
      }),
    ),
  );
}

function handleErrors(parameters: {
  request: HttpRequest<unknown>;
  next: HttpHandlerFn;
  authenticationService: AuthenticationService;
  alertStore: AlertStore;
  storageService: Storage | null;
  router: Router;
  errorResponse: HttpErrorResponse;
}): Observable<HttpEvent<unknown>> {
  if (isAccessTokenError(parameters.errorResponse)) {
    return tryRefreshToken(parameters);
  }

  if (isRefreshTokenError(parameters.errorResponse)) {
    parameters.authenticationService.logOut();
    void parameters.router.navigate([AUTH_URLS.logIn]);
    return throwError(() => new Error('Session expired. Please log in again.'));
  }

  return throwError(() => parameters.errorResponse);
}

function isAccessTokenError(errorResponse: HttpErrorResponse): boolean {
  return (
    errorResponse.status === 401 &&
    [AppError.ACCESS_TOKEN_NOT_FOUND, AppError.ACCESS_TOKEN_EXPIRED].includes(
      errorResponse.error.internalCode,
    )
  );
}

function isRefreshTokenError(errorResponse: HttpErrorResponse): boolean {
  return (
    errorResponse.status === 401 &&
    [AppError.REFRESH_TOKEN_NOT_FOUND, AppError.REFRESH_TOKEN_EXPIRED].includes(
      errorResponse.error.internalCode,
    )
  );
}

function tryRefreshToken(parameters: {
  request: HttpRequest<unknown>;
  next: HttpHandlerFn;
  authenticationService: AuthenticationService;
  alertStore: AlertStore;
  storageService: Storage | null;
  router: Router;
}): Observable<HttpEvent<unknown>> {
  if (!isRefreshing.getValue()) {
    return handleTokenRefresh(parameters);
  }

  return waitForTokenRefresh(parameters);
}

function handleTokenRefresh(parameters: {
  request: HttpRequest<unknown>;
  next: HttpHandlerFn;
  authenticationService: AuthenticationService;
  alertStore: AlertStore;
  storageService: Storage | null;
  router: Router;
}): Observable<HttpEvent<unknown>> {
  isRefreshing.next(true);

  return parameters.authenticationService.refreshToken().pipe(
    switchMap(() => {
      isRefreshing.next(false);
      return retryRequestWithRefreshedToken(parameters);
    }),
    catchError((error: HttpErrorResponse) => {
      isRefreshing.next(false);
      handleRefreshError(parameters);
      return throwError(() => error);
    }),
  );
}

function waitForTokenRefresh(parameters: {
  request: HttpRequest<unknown>;
  next: HttpHandlerFn;
  storageService: Storage | null;
}): Observable<HttpEvent<unknown>> {
  return isRefreshing.pipe(
    filter((refreshing) => !refreshing),
    take(1),
    switchMap(() => retryRequestWithRefreshedToken(parameters)),
  );
}

function retryRequestWithRefreshedToken(parameters: {
  request: HttpRequest<unknown>;
  next: HttpHandlerFn;
  storageService: Storage | null;
}): Observable<HttpEvent<unknown>> {
  const refreshedToken = parameters.storageService?.getItem(ACCESS_TOKEN_KEY);
  const clonedRequest = refreshedToken
    ? parameters.request.clone({
        setHeaders: { Authorization: `Bearer ${refreshedToken}` },
      })
    : parameters.request;
  return parameters.next(clonedRequest);
}

function handleRefreshError(parameters: {
  authenticationService: AuthenticationService;
  alertStore: AlertStore;
  router: Router;
}): void {
  parameters.authenticationService.logOut();
  parameters.alertStore.createErrorAlert(translations.sessionExpired);
  void parameters.router.navigate([AUTH_URLS.logIn]);
}
