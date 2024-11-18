import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_URLS } from '~core/consts/urls.consts';
import { AuthenticationService } from '~features/authentication/services/authentication.service';

export const authenticationGuard = () => {
  const authenticationService = inject(AuthenticationService);
  if (authenticationService.isUserLoggedIn()) {
    return true;
  } else {
    const router = inject(Router);
    router.navigate([AUTH_URLS.logIn]);
    return false;
  }
};
