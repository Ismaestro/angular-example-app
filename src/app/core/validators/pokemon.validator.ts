import type { Observable } from 'rxjs';
import { catchError, map, of } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import type { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { PokemonService } from '~features/pokemon-detail/services/pokemon.service';

@Injectable({ providedIn: 'root' })
export class PokemonValidator implements AsyncValidator {
  pokemonService = inject(PokemonService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.pokemonService.getPokemon(control.value).pipe(
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      map((pokemon) => (pokemon ? null : { uniqueRole: true })),
      catchError(() => of({ uniqueRole: true })),
    );
  }
}
