import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { forkJoin, map } from 'rxjs';
import type { HttpResourceRef } from '@angular/common/http';
import { HttpClient, HttpContext, HttpParams, httpResource } from '@angular/common/http';
import { CACHING_ENABLED } from '~core/interceptors/caching.interceptor';
import type { Pokemon } from '~features/pokemon/types/pokemon.type';
import { getEndpoints } from '~core/constants/endpoints.constants';
import type { LastUpdatedPokemonIdsResponse } from '~features/pokemon/types/last-updated-pokemon-ids-response.type';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly endpoints = getEndpoints();
  private readonly httpClient = inject(HttpClient);

  getPokemon(pokemonIdOrName: string | number): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(this.endpoints.pokemon.v1.pokemon(pokemonIdOrName), {
      params: new HttpParams().set('limit', '1'),
      context: new HttpContext().set(CACHING_ENABLED, true),
    });
  }

  getPokemonResource(pokemonName: () => string | undefined): HttpResourceRef<Pokemon | undefined> {
    return httpResource<Pokemon>(() =>
      pokemonName() ? this.endpoints.pokemon.v1.pokemon(pokemonName()!) : undefined,
    );
  }

  getPokemonByIds(ids: number[]): Observable<Pokemon[]> {
    const getPokemonRequests = ids.map((id) => this.getPokemon(id));
    return forkJoin(getPokemonRequests).pipe(
      map((pokemons: Pokemon[]) =>
        pokemons.toSorted((pokemonA, pokemonB) => Number(pokemonA.order) - Number(pokemonB.order)),
      ),
    );
  }

  getLastUpdatedPokemonIds(): Observable<string[]> {
    return this.httpClient
      .get<LastUpdatedPokemonIdsResponse>(this.endpoints.pokemon.v1.lastUpdated)
      .pipe(
        map((response: LastUpdatedPokemonIdsResponse) => {
          const { data } = response;
          return data.pokemonIds;
        }),
      );
  }
}
