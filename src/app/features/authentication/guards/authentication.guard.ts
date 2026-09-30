import { inject } from '@angular/core';
import type { UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { AUTH_URLS } from '~core/constants/urls.constants';
import { AuthenticationService } from '~features/authentication/services/authentication.service';

/**
 * Guards return a `UrlTree` to redirect instead of calling `router.navigate()` and returning
 * `false`: the router cancels the current navigation and starts the redirect as a single,
 * predictable step (with `canMatch`, returning `false` would make the router keep matching routes).
 */
export function authenticationGuard(): boolean | UrlTree {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  return authenticationService.authState().isLoggedIn || router.createUrlTree([AUTH_URLS.logIn]);
}
