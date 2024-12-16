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
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { AppError } from '~core/enums/app-error.enum';
import { AUTH_URLS } from '~core/constants/urls.constants';

const isRefreshing = new BehaviorSubject<boolean>(false);

export function authenticationInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  return next(request).pipe(
    catchError((errorResponse: HttpErrorResponse) => {
      if (isAccessTokenError(errorResponse)) {
        return tryRefreshToken(request, next, authenticationService);
      }

      if (isRefreshTokenError(errorResponse)) {
        authenticationService.logOut();
        void router.navigate([AUTH_URLS.logIn]);
        return throwError(() => new Error('Session expired. Please log in again.'));
      }

      return throwError(() => errorResponse);
    }),
  );
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

// eslint-disable-next-line @typescript-eslint/max-params
function tryRefreshToken(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authenticationService: AuthenticationService,
): Observable<HttpEvent<unknown>> {
  if (!isRefreshing.getValue()) {
    isRefreshing.next(true);

    return authenticationService.refreshToken().pipe(
      switchMap(() => {
        isRefreshing.next(false);
        return next(request.clone({ withCredentials: true }));
      }),
      catchError((error: HttpErrorResponse) => {
        isRefreshing.next(false);
        return throwError(() => error);
      }),
    );
  }

  return isRefreshing.pipe(
    filter((refreshing) => !refreshing),
    take(1),
    switchMap(() => next(request.clone({ withCredentials: true }))),
  );
}
