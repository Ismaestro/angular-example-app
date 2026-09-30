import { inject } from '@angular/core';
import type { UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { ROOT_URLS } from '~core/constants/urls.constants';

export function noAuthenticationGuard(): boolean | UrlTree {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  return !authenticationService.authState().isLoggedIn || router.createUrlTree([ROOT_URLS.home]);
}
