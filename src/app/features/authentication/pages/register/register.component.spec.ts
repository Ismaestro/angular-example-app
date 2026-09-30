import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { NEVER } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ENVIRONMENT } from '~core/tokens/environment.token';
import { cachingInterceptor } from '~core/interceptors/caching.interceptor';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { PIKACHU } from '~features/pokemon/testing/pokemon.fixtures';
import { RegisterComponent } from './register.component';

const PIKACHU_URL = 'https://pokeapi.co/api/v2/pokemon/pikachu?limit=1';

describe('RegisterComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;
  let httpTesting: HttpTestingController;
  let register: ReturnType<typeof vi.fn>;

  const fillForm = (overrides: Partial<{ confirmPassword: string }> = {}) => {
    component.registerForm.setValue({
      name: 'Ash',
      email: 'ash@pallet.com',
      password: 'Pikachu123',
      confirmPassword: 'Pikachu123',
      favouritePokemonName: 'Pikachu',
      terms: true,
      ...overrides,
    });
  };

  beforeEach(() => {
    vi.useFakeTimers();
    register = vi.fn().mockReturnValue(NEVER);
    TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptors([cachingInterceptor])),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ENVIRONMENT, useValue: { apiBaseUrl: 'https://api.test', domain: 'localhost' } },
        { provide: AuthenticationService, useValue: { register } },
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should register the user with the id of the validated favourite pokemon', () => {
    fillForm();
    expect(component.controls.favouritePokemonName.pending).toBe(true);

    vi.advanceTimersByTime(500);
    httpTesting.expectOne(PIKACHU_URL).flush(PIKACHU);
    expect(component.registerForm.valid).toBe(true);

    component.sendForm();
    // The lookup made by the validator is not repeated: it is served by the HTTP cache
    httpTesting.expectNone(PIKACHU_URL);

    expect(register).toHaveBeenCalledWith({
      name: 'Ash',
      email: 'ash@pallet.com',
      password: 'Pikachu123',
      terms: true,
      favouritePokemonId: PIKACHU.id,
    });
    expect(component.isLoading()).toBe(true);
  });

  it('should not register the user when the passwords do not match', () => {
    fillForm({ confirmPassword: 'Raichu123' });
    vi.advanceTimersByTime(500);
    httpTesting.expectOne(PIKACHU_URL).flush(PIKACHU);

    component.sendForm();

    expect(component.registerForm.hasError('passwordsMismatch')).toBe(true);
    expect(component.controls.confirmPassword.touched).toBe(true);
    expect(register).not.toHaveBeenCalled();
  });

  it('should not register the user while the favourite pokemon is being validated', () => {
    fillForm();

    component.sendForm();

    expect(register).not.toHaveBeenCalled();
  });
});
