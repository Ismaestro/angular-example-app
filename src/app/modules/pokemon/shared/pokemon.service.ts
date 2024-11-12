import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Pokemon } from '~modules/pokemon/shared/pokemon.type';
import { CACHING_ENABLED } from '~modules/shared/interceptors/caching.interceptor';

const POKEMON_API_HOST = 'https://pokeapi.co/api/v2';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  httpClient = inject(HttpClient);

  getPokemon(pokemonName: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(`${POKEMON_API_HOST}/pokemon/${pokemonName.trim()}`, {
      params: new HttpParams().set('limit', '1'),
      headers: {
        'X-Debug-Level': 'verbose',
      },
      context: new HttpContext().set(CACHING_ENABLED, true),
    });
  }
}
