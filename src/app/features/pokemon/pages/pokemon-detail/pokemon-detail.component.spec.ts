import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  provideZonelessChangeDetection,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Subject } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ENVIRONMENT } from '~core/tokens/environment.token';
import { UserStore } from '~features/authentication/services/user.store';
import type { User } from '~features/authentication/types/user.types';
import type { Pokemon } from '~features/pokemon/types/pokemon.types';
import type { BattlePhase } from '~features/pokemon/types/battle-phase.types';
import { BULBASAUR, PIKACHU } from '~features/pokemon/testing/pokemon.fixtures';
import { PokemonDetailComponent } from './pokemon-detail.component';

@Component({
  selector: 'app-pokemon-battlefield',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PokemonBattlefieldStubComponent {
  readonly pokemon = input<Pokemon>();
  readonly pokeballThrown = input(false);
  readonly catchAnimationEnd = output();
}

@Component({
  selector: 'app-pokedex',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PokedexStubComponent {
  readonly pokemon = input<Pokemon>();
  readonly battlePhase = input<BattlePhase>();
  readonly pokeballThrow = output();
}

@Component({
  selector: 'app-pokemon-search-input',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PokemonSearchInputStubComponent {}

const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon';

describe('PokemonDetailComponent', () => {
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let httpTesting: HttpTestingController;
  let catchResponse: Subject<User>;
  let userStore: { catchPokemon: ReturnType<typeof vi.fn> };

  const battlefield = () =>
    fixture.debugElement.query(By.directive(PokemonBattlefieldStubComponent))
      .componentInstance as PokemonBattlefieldStubComponent;
  const pokedex = () =>
    fixture.debugElement.query(By.directive(PokedexStubComponent))
      .componentInstance as PokedexStubComponent;

  const loadPokemon = async (pokemon: Pokemon) => {
    fixture.componentRef.setInput('pokemonId', pokemon.name);
    TestBed.tick();
    httpTesting.expectOne(`${POKE_API_URL}/${pokemon.name}`).flush(pokemon);
    await fixture.whenStable();
  };

  beforeEach(async () => {
    catchResponse = new Subject<User>();
    userStore = { catchPokemon: vi.fn().mockReturnValue(catchResponse) };

    TestBed.configureTestingModule({
      imports: [PokemonDetailComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ENVIRONMENT, useValue: { apiBaseUrl: 'https://api.test', domain: 'localhost' } },
        { provide: UserStore, useValue: userStore },
      ],
    }).overrideComponent(PokemonDetailComponent, {
      set: {
        imports: [
          PokemonBattlefieldStubComponent,
          PokedexStubComponent,
          PokemonSearchInputStubComponent,
        ],
      },
    });

    httpTesting = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PokemonDetailComponent);
    await loadPokemon(PIKACHU);
  });

  it('should pass the loaded pokemon and a ready battle down to its children', () => {
    expect(battlefield().pokemon()).toEqual(PIKACHU);
    expect(battlefield().pokeballThrown()).toBe(false);
    expect(pokedex().pokemon()).toEqual(PIKACHU);
    expect(pokedex().battlePhase()).toBe('ready');
  });

  it('should go through the whole battle when the pokedex throws the pokeball', async () => {
    pokedex().pokeballThrow.emit();
    await fixture.whenStable();
    expect(userStore.catchPokemon).toHaveBeenCalledWith(PIKACHU.id);
    expect(pokedex().battlePhase()).toBe('catching');

    catchResponse.next({} as User);
    await fixture.whenStable();
    expect(pokedex().battlePhase()).toBe('throwing');
    expect(battlefield().pokeballThrown()).toBe(true);

    battlefield().catchAnimationEnd.emit();
    await fixture.whenStable();
    expect(pokedex().battlePhase()).toBe('caught');
    expect(battlefield().pokeballThrown()).toBe(true);
  });

  it('should get the battle ready again when the catch request fails', async () => {
    pokedex().pokeballThrow.emit();
    catchResponse.error(new Error('Server error'));
    await fixture.whenStable();

    expect(pokedex().battlePhase()).toBe('ready');
  });

  it('should start a new battle when another pokemon is loaded', async () => {
    pokedex().pokeballThrow.emit();
    catchResponse.next({} as User);
    battlefield().catchAnimationEnd.emit();
    await fixture.whenStable();
    expect(pokedex().battlePhase()).toBe('caught');

    await loadPokemon(BULBASAUR);

    expect(pokedex().pokemon()).toEqual(BULBASAUR);
    expect(pokedex().battlePhase()).toBe('ready');
    expect(battlefield().pokeballThrown()).toBe(false);
  });
});
