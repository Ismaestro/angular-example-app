import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { beforeEach, describe, expect, it } from 'vitest';
import { UserStore } from '~features/authentication/services/user.store';
import type { User } from '~features/authentication/types/user.types';
import type { BattlePhase } from '~features/pokemon/types/battle-phase.types';
import { PokemonImageComponent } from '~features/pokemon/components/pokemon-image/pokemon-image.component';
import { PIKACHU } from '~features/pokemon/testing/pokemon.fixtures';
import { PokedexComponent } from './pokedex.component';

@Component({
  selector: 'app-pokemon-image',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PokemonImageStubComponent {
  readonly image = input<string>();
}

describe('PokedexComponent', () => {
  let fixture: ComponentFixture<PokedexComponent>;
  const user = signal<User | undefined>(undefined);
  const isUserLoading = signal(false);

  const render = async (battlePhase: BattlePhase) => {
    fixture.componentRef.setInput('battlePhase', battlePhase);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  };
  const pokeballButton = (element: HTMLElement) =>
    element.querySelector<HTMLButtonElement>('sl-button');
  const message = (element: HTMLElement) =>
    element.querySelector('.pokedex__bottom-data-container p')?.textContent ?? '';

  beforeEach(() => {
    user.set(undefined);
    isUserLoading.set(false);

    TestBed.configureTestingModule({
      imports: [PokedexComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: UserStore,
          useValue: {
            user: { value: user, isLoading: isUserLoading, hasValue: () => user() !== undefined },
          },
        },
      ],
    }).overrideComponent(PokedexComponent, {
      remove: { imports: [PokemonImageComponent] },
      add: { imports: [PokemonImageStubComponent] },
    });

    fixture = TestBed.createComponent(PokedexComponent);
    fixture.componentRef.setInput('pokemon', PIKACHU);
  });

  it('should offer to catch a pokemon the user does not have yet', async () => {
    user.set({ name: 'Ash', caughtPokemonIds: [1] } as User);
    const element = await render('ready');

    let thrown = false;
    fixture.componentInstance.pokeballThrow.subscribe(() => {
      thrown = true;
    });
    pokeballButton(element)?.click();

    expect(pokeballButton(element)?.disabled).toBe(false);
    expect(thrown).toBe(true);
  });

  it('should disable the pokeball while the pokemon is being caught', async () => {
    const element = await render('catching');

    expect(pokeballButton(element)?.disabled).toBe(true);
  });

  it('should not offer to catch a pokemon the user already has', async () => {
    user.set({ name: 'Ash', caughtPokemonIds: [PIKACHU.id] } as User);
    const element = await render('ready');

    expect(pokeballButton(element)).toBeNull();
    expect(message(element)).not.toBe('');
  });

  it('should congratulate the user once the pokemon has been caught', async () => {
    user.set({ name: 'Ash', caughtPokemonIds: [PIKACHU.id] } as User);
    const element = await render('caught');

    expect(pokeballButton(element)).toBeNull();
    expect(message(element)).toContain('Ash');
  });

  it('should not show anything while the user is being loaded', async () => {
    isUserLoading.set(true);
    const element = await render('ready');

    expect(pokeballButton(element)).toBeNull();
    expect(message(element)).toBe('');
  });
});
