import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApplicationRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ENVIRONMENT } from '~core/tokens/environment.token';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { UserStore } from '~features/authentication/services/user.store';
import type { User } from '~features/authentication/types/user.types';

const API_BASE_URL = 'https://api.test';
const USER_URL = `${API_BASE_URL}/v1/user`;
const ASH = { name: 'Ash', caughtPokemonIds: [1] } as User;

describe('UserStore', () => {
  let store: UserStore;
  let httpTesting: HttpTestingController;
  const authState = signal({ isLoggedIn: true });

  beforeEach(() => {
    authState.set({ isLoggedIn: true });
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ENVIRONMENT, useValue: { apiBaseUrl: API_BASE_URL, domain: 'localhost' } },
        { provide: AuthenticationService, useValue: { authState } },
      ],
    });
    store = TestBed.inject(UserStore);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  const whenStable = async () => TestBed.inject(ApplicationRef).whenStable();

  it('should fetch the user while there is a session', async () => {
    TestBed.tick();
    httpTesting.expectOne(USER_URL).flush({ ok: true, data: { user: ASH } });
    await whenStable();

    expect(store.user.value()).toEqual(ASH);
  });

  it('should not fetch anything without a session, and forget the user on log out', async () => {
    TestBed.tick();
    httpTesting.expectOne(USER_URL).flush({ ok: true, data: { user: ASH } });
    await whenStable();
    expect(store.user.value()).toEqual(ASH);

    authState.set({ isLoggedIn: false });
    TestBed.tick();
    await whenStable();

    httpTesting.expectNone(USER_URL);
    expect(store.user.value()).toBeUndefined();
  });

  it('should update the user locally after catching a pokemon, without refetching it', async () => {
    TestBed.tick();
    httpTesting.expectOne(USER_URL).flush({ ok: true, data: { user: ASH } });
    await whenStable();
    const updatedAsh = { ...ASH, caughtPokemonIds: [1, 25] };

    store.catchPokemon(25).subscribe();
    httpTesting
      .expectOne(`${USER_URL}/pokemon/catch`)
      .flush({ ok: true, data: { user: updatedAsh } });

    expect(store.user.value()).toEqual(updatedAsh);
  });
});
