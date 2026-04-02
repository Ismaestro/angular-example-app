import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { authenticationGuard } from './authentication.guard';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { AUTH_URLS } from '~core/constants/urls.constants';

describe('authenticationGuard', () => {
  let mockAuthService: { authState: ReturnType<typeof vi.fn> };
  let mockRouter: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockAuthService = {
      authState: vi.fn(),
    };
    mockRouter = {
      navigate: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should return true if user is logged in', () => {
    mockAuthService.authState.mockReturnValue({ isLoggedIn: true });

    const result = TestBed.runInInjectionContext(() => authenticationGuard());

    expect(result).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to login and return false if user is NOT logged in', () => {
    mockAuthService.authState.mockReturnValue({ isLoggedIn: false });

    const result = TestBed.runInInjectionContext(() => authenticationGuard());

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith([AUTH_URLS.logIn]);
  });
});
