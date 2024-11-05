import { inject, Injectable, signal } from '@angular/core';
import { StorageService } from '~modules/shared/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  storageService = inject(StorageService);

  private isUserLoggedInSignal = signal(!!this.storageService.get('user'));

  isUserLoggedIn(): boolean {
    return this.isUserLoggedInSignal();
  }

  logIn(loginFormValue: object) {
    this.storageService.set('user', JSON.stringify(loginFormValue));
    this.isUserLoggedInSignal.set(true);
  }

  logOut() {
    this.storageService.remove('user');
    this.isUserLoggedInSignal.set(false);
  }
}
