import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { USER_URLS } from '~modules/shared/consts/urls.consts';
import { AuthService } from '~modules/auth/shared/auth.service';

export const noAuthenticationGuard = () => {
  const authService = inject(AuthService);
  if (authService.isUserLoggedIn()) {
    const router = inject(Router);
    router.navigate([USER_URLS.dashboard]);
    return false;
  }
  return true;
};
