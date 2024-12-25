import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { ROOT_PATHS } from '~core/constants/paths.constants';

export const noAuthenticationGuard = () => {
  const authenticationService = inject(AuthenticationService);
  if (authenticationService.isUserLoggedIn()) {
    const router = inject(Router);
    void router.navigate([ROOT_PATHS.myPokemon]);
    return false;
  }
  return true;
};
