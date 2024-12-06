import type { Observable } from 'rxjs';
import { catchError, map, of } from 'rxjs';
import { inject, Injectable, signal } from '@angular/core';
import type { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { PokemonService } from '~features/pokemon-detail/services/pokemon.service';

@Injectable({ providedIn: 'root' })
export class PokemonValidator implements AsyncValidator {
  private readonly pokemonService = inject(PokemonService);

  private readonly isPokemonValidatingSignal = signal(false);

  isPokemonValidating(): boolean {
    return this.isPokemonValidatingSignal();
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const pokemonName = control.value;
    if (pokemonName) {
      this.isPokemonValidatingSignal.set(true);
      return this.pokemonService.getPokemon(pokemonName.trim().toLowerCase()).pipe(
        map(() => {
          this.isPokemonValidatingSignal.set(false);
          return null;
        }),
        catchError(() => {
          this.isPokemonValidatingSignal.set(false);
          return of({ pokemonName: true });
        }),
      );
    }
    this.isPokemonValidatingSignal.set(false);
    return of(null);
  }
}
