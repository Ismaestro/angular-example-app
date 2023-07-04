import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { appRoutes } from '../../../app-routes';
import { AuthRepository } from '~modules/auth/store/auth.repository';

export const authenticationGuard = () => {
  const authRepository: AuthRepository = inject(AuthRepository);
  if (authRepository.isLoggedInValue()) {
    return true;
  } else {
    const router: Router = inject(Router);
    router.navigate([appRoutes.home]);
    return false;
  }
};
