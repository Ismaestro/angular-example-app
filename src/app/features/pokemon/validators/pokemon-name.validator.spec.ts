import { FormControl } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { PokemonService } from '~features/pokemon/services/pokemon.service';
import { PIKACHU } from '~features/pokemon/testing/pokemon.fixtures';
import { pokemonNameValidator } from './pokemon-name.validator';

describe('pokemonNameValidator', () => {
  let getPokemon: ReturnType<typeof vi.fn>;

  const createControl = () => {
    const pokemonService = { getPokemon } as unknown as PokemonService;
    return new FormControl('', {
      nonNullable: true,
      asyncValidators: [pokemonNameValidator(pokemonService, 500)],
    });
  };

  beforeEach(() => {
    vi.useFakeTimers();
    getPokemon = vi.fn((name: string) =>
      name === 'pikachu' ? of(PIKACHU) : throwError(() => new Error('Not Found')),
    );
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should accept an existing pokemon, whatever its case and spaces', () => {
    const control = createControl();

    control.setValue('  PikaChu ');
    expect(control.pending).toBe(true);
    vi.advanceTimersByTime(500);

    expect(getPokemon).toHaveBeenCalledWith('pikachu');
    expect(control.valid).toBe(true);
  });

  it('should reject a pokemon that does not exist', () => {
    const control = createControl();

    control.setValue('missingno');
    vi.advanceTimersByTime(500);

    expect(control.errors).toEqual({ pokemonName: true });
  });

  it('should only look up the last value typed within the debounce time', () => {
    const control = createControl();

    control.setValue('pika');
    vi.advanceTimersByTime(200);
    control.setValue('pikachu');
    vi.advanceTimersByTime(500);

    expect(getPokemon).toHaveBeenCalledTimes(1);
    expect(getPokemon).toHaveBeenCalledWith('pikachu');
  });
});
