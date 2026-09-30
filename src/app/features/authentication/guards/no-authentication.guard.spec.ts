import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, UrlTree } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { noAuthenticationGuard } from './no-authentication.guard';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { ROOT_URLS } from '~core/constants/urls.constants';

describe('noAuthenticationGuard', () => {
  const authState = signal({ isLoggedIn: false });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AuthenticationService, useValue: { authState } }],
    });
  });

  it('should allow the navigation if the user is NOT logged in', () => {
    authState.set({ isLoggedIn: false });

    const result = TestBed.runInInjectionContext(() => noAuthenticationGuard());

    expect(result).toBe(true);
  });

  it('should redirect to home if the user is already logged in', () => {
    authState.set({ isLoggedIn: true });

    const result = TestBed.runInInjectionContext(() => noAuthenticationGuard());

    expect(result).toBeInstanceOf(UrlTree);
    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe(ROOT_URLS.home);
  });
});
