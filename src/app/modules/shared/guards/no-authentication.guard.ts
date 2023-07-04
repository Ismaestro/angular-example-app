import { userRoutes } from '~modules/user/shared/user-routes';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthRepository } from '~modules/auth/store/auth.repository';

export function noAuthenticationGuard(): CanActivateFn {
  return () => {
    const authRepository: AuthRepository = inject(AuthRepository);
    if (!authRepository.isLoggedInValue()) {
      return true;
    } else {
      const router: Router = inject(Router);
      router.navigate([userRoutes.dashboard]);
      return false;
    }
  };
}
