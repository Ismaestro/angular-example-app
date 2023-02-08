import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthRepository } from '~modules/auth/store/auth.repository';

// eslint-disable-next-line max-lines-per-function
describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj<Router>('Router', {
      navigate: new Promise(resolve => resolve(true)),
    });
    guard = new AuthGuard(
      {
        isLoggedInValue: () => true,
      } as AuthRepository,
      routerSpy
    );
    routerSpy.navigate.calls.reset();
  });

  it('should grant access because user is logged in', async () => {
    expect(await guard.canActivate()).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should not grant access because user is logged out', async () => {
    guard = new AuthGuard(
      {
        isLoggedInValue: () => false,
      } as AuthRepository,
      routerSpy
    );
    expect(await guard.canActivate()).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
