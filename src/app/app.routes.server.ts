import type { ServerRoute } from '@angular/ssr';
import { RenderMode } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'pokemon/:pokemonId',
    renderMode: RenderMode.Prerender,
    // eslint-disable-next-line @typescript-eslint/require-await
    async getPrerenderParams() {
      return [{ pokemonId: 'pikachu' }];
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
