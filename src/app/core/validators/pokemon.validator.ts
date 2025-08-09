import type { Observable } from 'rxjs';
import { catchError, finalize, map, of, switchMap, tap, timer } from 'rxjs';
import { inject, Injectable, signal } from '@angular/core';
import type { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { PokemonService } from '~features/pokemon/services/pokemon.service';

@Injectable({ providedIn: 'root' })
export class PokemonValidator implements AsyncValidator {
  private readonly pokemonService = inject(PokemonService);
  private readonly pokemonName = signal('');
  private readonly debounceMs = 500;

  readonly pokemonId = signal(-1);
  readonly isPokemonValidating = signal(false);

  validate(control: AbstractControl<string | null>): Observable<ValidationErrors | null> {
    const pokemonName = (control.value ?? '').toLowerCase().trim();

    if (!pokemonName) {
      this.isPokemonValidating.set(false);
      this.pokemonId.set(-1);
      return of(null);
    }

    this.pokemonName.set(pokemonName);
    this.isPokemonValidating.set(true);
    return this.validatePokemonName(pokemonName).pipe(
      finalize(() => {
        this.isPokemonValidating.set(false);
      }),
    );
  }

  private validatePokemonName(pokemonName: string): Observable<ValidationErrors | null> {
    return timer(this.debounceMs).pipe(
      switchMap(() =>
        this.pokemonService.getPokemon(pokemonName).pipe(
          tap((pokemon) => {
            this.pokemonId.set(pokemon.id);
          }),
          map(() => null),
          catchError(() => of({ pokemonName: true })),
        ),
      ),
    );
  }
}
