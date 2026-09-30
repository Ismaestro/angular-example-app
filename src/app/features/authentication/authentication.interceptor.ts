import type { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { AppError } from '~core/enums/app-error.enums';
import { AUTH_URLS } from '~core/constants/urls.constants';
import { ENVIRONMENT } from '~core/tokens/environment.token';
import { translations } from '~locale/translations';
import { AlertService } from '~core/services/ui/alert.service';
import { SKIP_AUTHENTICATION } from '~features/authentication/constants/authentication.constants';

const ACCESS_TOKEN_ERRORS: ReadonlySet<AppError> = new Set([
  AppError.ACCESS_TOKEN_NOT_FOUND,
  AppError.ACCESS_TOKEN_EXPIRED,
]);

/**
 * Attaches the access token to the requests sent to our API, and only to our API: third-party
 * services (PokeAPI, Cloudinary...) must never receive it. When the API reports that the access
 * token is missing or expired, it refreshes it once and retries the original request.
 */
export const authenticationInterceptor: HttpInterceptorFn = (request, next) => {
  const { apiBaseUrl } = inject(ENVIRONMENT);
  if (request.context.get(SKIP_AUTHENTICATION) || !request.url.startsWith(apiBaseUrl)) {
    return next(request);
  }

  const authenticationService = inject(AuthenticationService);
  const endSession = injectEndSession();
  const sendWithToken = (accessToken: string | undefined) =>
    next(withAccessToken(request, accessToken));

  return sendWithToken(authenticationService.authState().accessToken).pipe(
    catchError((error: unknown) => {
      if (!isAccessTokenError(error)) {
        return throwError(() => error);
      }

      return authenticationService.refreshAccessToken().pipe(
        catchError((refreshError: unknown) => {
          endSession();
          return throwError(() => refreshError);
        }),
        switchMap(sendWithToken),
      );
    }),
  );
};

function withAccessToken<T>(request: HttpRequest<T>, accessToken: string | undefined) {
  return accessToken
    ? request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
    : request;
}

function isAccessTokenError(error: unknown): boolean {
  if (
    !(error instanceof HttpErrorResponse) ||
    error.status !== (HttpStatusCode.Unauthorized as number)
  ) {
    return false;
  }
  const { internalCode } = (error.error ?? {}) as { internalCode?: AppError };
  return internalCode !== undefined && ACCESS_TOKEN_ERRORS.has(internalCode);
}

/**
 * Dependencies are injected upfront because `inject()` only works in an injection context,
 * and RxJS callbacks run outside of it.
 */
function injectEndSession(): () => void {
  const authenticationService = inject(AuthenticationService);
  const alertService = inject(AlertService);
  const router = inject(Router);

  return () => {
    authenticationService.logOut();
    alertService.createErrorAlert(translations.sessionExpired);
    void router.navigate([AUTH_URLS.logIn]);
  };
}
