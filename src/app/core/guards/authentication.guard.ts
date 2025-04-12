import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_URLS } from '~core/constants/urls.constants';
import { AuthenticationService } from '~features/authentication/services/authentication.service';

export function authenticationGuard(): boolean {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.authState().isLoggedIn) {
    return true;
  }

  void router.navigate([AUTH_URLS.logIn]);
  return false;
};
