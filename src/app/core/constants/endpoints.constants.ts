import { inject } from '@angular/core';
import type { Environment } from '~core/tokens/environment.token';
import { ENVIRONMENT } from '~core/tokens/environment.token';

export const getEndpoints = () => {
  const environment = inject<Environment>(ENVIRONMENT);
  const POKEMON_API_HOST = 'https://pokeapi.co/api';
  return {
    auth: {
      v1: {
        authentication: `${environment.apiBaseUrl}/v1/authentication`,
        login: `${environment.apiBaseUrl}/v1/authentication/login`,
        refreshToken: `${environment.apiBaseUrl}/v1/authentication/token/refresh`,
      },
    },
    user: {
      v1: {
        user: `${environment.apiBaseUrl}/v1/user`,
        pokemonCatch: `${environment.apiBaseUrl}/v1/user/pokemon/catch`,
      },
    },
    pokemon: {
      v1: {
        pokemon: (pokemonIdOrName: string | number) =>
          `${POKEMON_API_HOST}/v2/pokemon/${pokemonIdOrName}`,
      },
    },
    analytics: {
      v1: {
        realtimeUsers: `${environment.apiBaseUrl}/v1/analytics/realtime-users`,
      },
    },
  } as const;
};
