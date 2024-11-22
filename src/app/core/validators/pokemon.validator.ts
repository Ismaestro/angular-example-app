import { catchError, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { PokemonService } from '~features/pokemon-detail/services/pokemon.service';

@Injectable({ providedIn: 'root' })
export class PokemonValidator implements AsyncValidator {
  constructor(private pokemonService: PokemonService) {}
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.pokemonService.getPokemon(control.value).pipe(
      map((pokemon) => (pokemon ? null : { uniqueRole: true })),
      catchError(() => of({ uniqueRole: true })),
    );
  }
}
