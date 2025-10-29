import type { ServerRoute } from '@angular/ssr';
import { RenderMode } from '@angular/ssr';
import { inject } from '@angular/core';
import { PokemonService } from '~features/pokemon/services/pokemon.service';
import { firstValueFrom } from 'rxjs';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'pokemon/:pokemonId',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const pokemonService = inject(PokemonService);
      const pokemonIds = await firstValueFrom(pokemonService.getLastUpdatedPokemonIds());
      return pokemonIds.map((pokemonId) => ({ pokemonId }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
