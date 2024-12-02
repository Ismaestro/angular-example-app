import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { USER_URLS } from '~core/constants/urls.constants';
import { AuthenticationService } from '~features/authentication/services/authentication.service';

export const noAuthenticationGuard = () => {
  const authenticationService = inject(AuthenticationService);
  if (authenticationService.isUserLoggedIn()) {
    const router = inject(Router);
    void router.navigate([USER_URLS.dashboard]);
    return false;
  }
  return true;
};
