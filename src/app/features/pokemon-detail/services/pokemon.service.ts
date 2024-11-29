import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { CACHING_ENABLED } from '~core/interceptors/caching.interceptor';
import type { Pokemon } from '~features/pokemon-detail/types/pokemon.type';

const POKEMON_API_HOST = 'https://pokeapi.co/api/v2';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly httpClient = inject(HttpClient);

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
