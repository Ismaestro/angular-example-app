import { rxResource } from '@angular/core/rxjs-interop';
import type { SchemaPath } from '@angular/forms/signals';
import { validateAsync } from '@angular/forms/signals';
import { map, switchMap, timer } from 'rxjs';
import type { PokemonService } from '~features/pokemon/services/pokemon.service';

const DEFAULT_DEBOUNCE_MS = 500;

/**
 * Async validator that only answers "does this pokemon exist?". It only runs when the synchronous
 * validators pass. The resource cancels the previous lookup when the value changes, so the timer
 * works as a debounce. The service is a parameter (instead of injected) so it is easy to test.
 */
export function validatePokemonName(
  path: SchemaPath<string>,
  pokemonService: PokemonService,
  debounceMs = DEFAULT_DEBOUNCE_MS,
): void {
  validateAsync(path, {
    // `undefined` means "nothing to validate"
    params: ({ value }) => value().trim().toLowerCase() || undefined,
    factory: (pokemonName) =>
      rxResource({
        params: pokemonName,
        stream: ({ params }) =>
          timer(debounceMs).pipe(
            switchMap(() => pokemonService.getPokemon(params)),
            map(() => true),
          ),
      }),
    onSuccess: () => null,
    onError: () => ({ kind: 'pokemonName' }),
  });
}
