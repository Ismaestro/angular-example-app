import type { Observable } from 'rxjs';
import { catchError, map, of } from 'rxjs';
import { inject, Injectable, signal } from '@angular/core';
import type { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { PokemonService } from '~features/pokemon/services/pokemon.service';

@Injectable({ providedIn: 'root' })
export class PokemonValidator implements AsyncValidator {
  private readonly pokemonService = inject(PokemonService);
  private readonly pokemonName = signal('');

  readonly pokemonId = signal(-1);
  readonly isPokemonValidating = signal(false);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const pokemonName = (control.value ?? '').toLowerCase().trim();

    if (!pokemonName) {
      this.isPokemonValidating.set(false);
      return of(null);
    }

    this.pokemonName.set(pokemonName.toLowerCase());
    this.isPokemonValidating.set(true);
    return this.pokemonService.getPokemon(pokemonName.toLowerCase()).pipe(
      map((pokemon) => {
        this.isPokemonValidating.set(false);
        this.pokemonId.set(pokemon.id);
        return null;
      }),
      catchError(() => {
        this.isPokemonValidating.set(false);
        return of({ pokemonName: true });
      }),
    );
  }
}
