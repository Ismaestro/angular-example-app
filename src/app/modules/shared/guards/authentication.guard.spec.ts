import { TestBed } from '@angular/core/testing';
import { lastValueFrom, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthRepository } from '~modules/auth/store/auth.repository';
import { authenticationGuard } from '~modules/shared/guards/authentication.guard';

// eslint-disable-next-line max-lines-per-function
describe('AuthenticationGuard', () => {
  const mockRouter = jasmine.createSpyObj<Router>(['navigate']);
  mockRouter.navigate.and.returnValue(lastValueFrom(of(true)));

  const setup = (authRepositoryMock: unknown) => {
    TestBed.configureTestingModule({
      providers: [
        authenticationGuard,
        { provide: AuthRepository, useValue: authRepositoryMock },
        { provide: Router, useValue: mockRouter },
      ],
    });

    return TestBed.runInInjectionContext(authenticationGuard);
  };

  it('should allow to continue', () => {
    const mockDomainService: unknown = {
      isLoggedInValue: () => true,
    };
    const guard = setup(mockDomainService);
    expect(guard).toBe(true);
  });

  it('should redirect to /', () => {
    const mockDomainService: unknown = {
      isLoggedInValue: () => false,
    };
    const guard = setup(mockDomainService);
    expect(guard).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
