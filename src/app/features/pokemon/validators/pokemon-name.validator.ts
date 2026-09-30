import type { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import type { Observable } from 'rxjs';
import { catchError, map, of, switchMap, timer } from 'rxjs';
import type { PokemonService } from '~features/pokemon/services/pokemon.service';

const DEFAULT_DEBOUNCE_MS = 500;

/**
 * Stateless async validator: it only answers "does this pokemon exist?". Angular unsubscribes
 * from the previous validation when the value changes, so the timer works as a debounce.
 * The service is a parameter (instead of injected) so the validator is a pure, testable function.
 */
export function pokemonNameValidator(
  pokemonService: PokemonService,
  debounceMs = DEFAULT_DEBOUNCE_MS,
): AsyncValidatorFn {
  return (control: AbstractControl<string>): Observable<ValidationErrors | null> => {
    const pokemonName = control.value.trim().toLowerCase();
    if (!pokemonName) {
      return of(null);
    }

    return timer(debounceMs).pipe(
      switchMap(() => pokemonService.getPokemon(pokemonName)),
      map(() => null),
      catchError(() => of({ pokemonName: true })),
    );
  };
}
