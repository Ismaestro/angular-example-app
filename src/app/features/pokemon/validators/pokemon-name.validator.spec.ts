import { provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, required } from '@angular/forms/signals';
import { of, throwError } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { PokemonService } from '~features/pokemon/services/pokemon.service';
import { PIKACHU } from '~features/pokemon/testing/pokemon.fixtures';
import { validatePokemonName } from './pokemon-name.validator';

describe('validatePokemonName', () => {
  let getPokemon: ReturnType<typeof vi.fn>;

  const createForm = () => {
    const pokemonService = { getPokemon } as unknown as PokemonService;
    const model = signal({ pokemonName: '' });
    const pokemonForm = TestBed.runInInjectionContext(() =>
      form(model, (path) => {
        required(path.pokemonName);
        validatePokemonName(path.pokemonName, pokemonService, 500);
      }),
    );
    return { model, pokemonForm };
  };

  const type = async (model: ReturnType<typeof createForm>['model'], pokemonName: string) => {
    model.set({ pokemonName });
    await vi.advanceTimersByTimeAsync(0);
  };

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
    getPokemon = vi.fn((name: string) =>
      name === 'pikachu' ? of(PIKACHU) : throwError(() => new Error('Not Found')),
    );
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should accept an existing pokemon, whatever its case and spaces', async () => {
    const { model, pokemonForm } = createForm();

    await type(model, '  PikaChu ');
    expect(pokemonForm.pokemonName().pending()).toBe(true);
    await vi.advanceTimersByTimeAsync(500);

    expect(getPokemon).toHaveBeenCalledWith('pikachu');
    expect(pokemonForm.pokemonName().valid()).toBe(true);
  });

  it('should reject a pokemon that does not exist', async () => {
    const { model, pokemonForm } = createForm();

    await type(model, 'missingno');
    await vi.advanceTimersByTimeAsync(500);

    expect(pokemonForm.pokemonName().errors()).toEqual([
      expect.objectContaining({ kind: 'pokemonName' }),
    ]);
  });

  it('should only look up the last value typed within the debounce time', async () => {
    const { model } = createForm();

    await type(model, 'pika');
    await vi.advanceTimersByTimeAsync(200);
    await type(model, 'pikachu');
    await vi.advanceTimersByTimeAsync(500);

    expect(getPokemon).toHaveBeenCalledTimes(1);
    expect(getPokemon).toHaveBeenCalledWith('pikachu');
  });

  it('should not look anything up while the field is empty', async () => {
    const { pokemonForm } = createForm();

    await vi.advanceTimersByTimeAsync(500);

    expect(getPokemon).not.toHaveBeenCalled();
    expect(pokemonForm.pokemonName().pending()).toBe(false);
  });
});
