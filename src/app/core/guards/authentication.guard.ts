import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_URLS } from '~core/constants/urls.constants';
import { AuthenticationService } from '~features/authentication/services/authentication.service';

export const authenticationGuard = () => {
  const authenticationService = inject(AuthenticationService);
  if (authenticationService.isUserLoggedIn()) {
    return true;
  }

  const router = inject(Router);
  void router.navigate([AUTH_URLS.logIn]);
  return false;
};
