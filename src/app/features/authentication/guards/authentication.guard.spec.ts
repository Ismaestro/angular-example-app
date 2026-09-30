import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, UrlTree } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { authenticationGuard } from './authentication.guard';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { AUTH_URLS } from '~core/constants/urls.constants';

describe('authenticationGuard', () => {
  const authState = signal({ isLoggedIn: false });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AuthenticationService, useValue: { authState } }],
    });
  });

  it('should allow the navigation if the user is logged in', () => {
    authState.set({ isLoggedIn: true });

    const result = TestBed.runInInjectionContext(() => authenticationGuard());

    expect(result).toBe(true);
  });

  it('should redirect to the log in page if the user is NOT logged in', () => {
    authState.set({ isLoggedIn: false });

    const result = TestBed.runInInjectionContext(() => authenticationGuard());

    expect(result).toBeInstanceOf(UrlTree);
    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe(AUTH_URLS.logIn);
  });
});
