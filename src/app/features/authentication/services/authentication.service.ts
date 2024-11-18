import { inject, Injectable, signal } from '@angular/core';
import { LOCAL_STORAGE } from '~core/providers/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly storageService = inject(LOCAL_STORAGE);
  private readonly isUserLoggedInSignal = signal(!!this.storageService?.getItem('user'));

  isUserLoggedIn(): boolean {
    return this.isUserLoggedInSignal();
  }

  logIn(loginFormValue: object) {
    this.storageService?.setItem('user', JSON.stringify(loginFormValue));
    this.isUserLoggedInSignal.set(true);
  }

  logOut() {
    this.storageService?.removeItem('user');
    this.isUserLoggedInSignal.set(false);
  }
}
