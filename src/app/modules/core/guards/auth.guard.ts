import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { appRoutes } from '../../../app-routes';
import { AuthRepository } from '~modules/auth/store/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authRepository: AuthRepository, private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.authRepository.isLoggedInValue()) {
        return resolve(true);
      } else {
        return this.router.navigate([appRoutes.home]).then(() => {
          return resolve(false);
        });
      }
    });
  }
}
