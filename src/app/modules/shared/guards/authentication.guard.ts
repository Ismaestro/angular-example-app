import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_URLS } from '~modules/shared/consts/urls.consts';
import { AuthService } from '~modules/auth/shared/auth.service';

export const authenticationGuard = () => {
  const authService = inject(AuthService);
  if (authService.isUserLoggedIn()) {
    return true;
  } else {
    const router = inject(Router);
    router.navigate([AUTH_URLS.logIn]);
    return false;
  }
};
