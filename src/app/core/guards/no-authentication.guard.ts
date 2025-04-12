import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { ROOT_PATHS } from '~core/constants/paths.constants';

export function noAuthenticationGuard(): boolean {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.authState().isLoggedIn) {
    void router.navigate([ROOT_PATHS.home]);
    return false;
  }

  return true;
}
