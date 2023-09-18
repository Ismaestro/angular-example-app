import { userRoutes } from '~modules/user/shared/user-routes';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRepository } from '~modules/auth/store/auth.repository';

export const noAuthenticationGuard = () => {
  const authRepository: AuthRepository = inject(AuthRepository);
  if (!authRepository.isLoggedInValue()) {
    return true;
  } else {
    const router: Router = inject(Router);
    router.navigate([userRoutes.dashboard]);
    return false;
  }
};
