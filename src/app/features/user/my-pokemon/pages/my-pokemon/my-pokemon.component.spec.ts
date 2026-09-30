import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserStore } from '~features/authentication/services/user.store';
import type { User } from '~features/authentication/types/user.types';
import { PokemonService } from '~features/pokemon/services/pokemon.service';
import type { Pokemon } from '~features/pokemon/types/pokemon.types';
import { BULBASAUR, PIKACHU } from '~features/pokemon/testing/pokemon.fixtures';
import { MyPokemonComponent } from './my-pokemon.component';

@Component({
  selector: 'app-pokemon-card',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PokemonCardStubComponent {
  readonly pokemon = input<Pokemon>();
  readonly loading = input<boolean>();
}

@Component({
  selector: 'app-pokemon-search-input',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PokemonSearchInputStubComponent {
  readonly title = input<string>();
}

describe('MyPokemonComponent', () => {
  let fixture: ComponentFixture<MyPokemonComponent>;
  let pokemonsResponse: Subject<Pokemon[]>;
  const user = signal<User | undefined>(undefined);
  const isUserLoading = signal(false);

  const cards = () =>
    fixture.debugElement
      .queryAll(By.directive(PokemonCardStubComponent))
      .map((card) => card.componentInstance as PokemonCardStubComponent);
  const emptyState = () =>
    (fixture.nativeElement as HTMLElement).querySelector('.pokemons-empty__container');

  beforeEach(() => {
    pokemonsResponse = new Subject<Pokemon[]>();
    user.set(undefined);
    isUserLoading.set(true);

    TestBed.configureTestingModule({
      imports: [MyPokemonComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: UserStore,
          useValue: {
            user: {
              value: user,
              isLoading: isUserLoading,
              hasValue: () => user() !== undefined,
              error: () => undefined,
            },
          },
        },
        {
          provide: PokemonService,
          useValue: { getPokemonByIds: vi.fn().mockReturnValue(pokemonsResponse) },
        },
      ],
    }).overrideComponent(MyPokemonComponent, {
      set: { imports: [PokemonCardStubComponent, PokemonSearchInputStubComponent] },
    });

    fixture = TestBed.createComponent(MyPokemonComponent);
  });

  it('should show skeletons, and not the empty state, while loading', async () => {
    await fixture.whenStable();
    expect(cards().every((card) => card.loading())).toBe(true);
    expect(emptyState()).toBeNull();

    user.set({ caughtPokemonIds: [PIKACHU.id, BULBASAUR.id] } as User);
    isUserLoading.set(false);
    TestBed.tick();
    expect(cards().every((card) => card.loading())).toBe(true);
    expect(emptyState()).toBeNull();
  });

  it('should list the pokemon caught by the user', async () => {
    user.set({ caughtPokemonIds: [PIKACHU.id, BULBASAUR.id] } as User);
    isUserLoading.set(false);
    TestBed.tick();

    pokemonsResponse.next([BULBASAUR, PIKACHU]);
    await fixture.whenStable();

    expect(cards().map((card) => card.pokemon())).toEqual([BULBASAUR, PIKACHU]);
    expect(emptyState()).toBeNull();
  });

  it('should show the empty state when the user has not caught any pokemon', async () => {
    user.set({ caughtPokemonIds: [] as number[] } as User);
    isUserLoading.set(false);
    await fixture.whenStable();

    expect(cards()).toHaveLength(0);
    expect(emptyState()).not.toBeNull();
  });
});
