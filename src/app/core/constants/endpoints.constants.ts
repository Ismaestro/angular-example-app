import { inject } from '@angular/core';
import type { Environment } from '~core/tokens/environment.token';
import { ENVIRONMENT } from '~core/tokens/environment.token';

const getAuthEndpoints = (baseUrl: string) => ({
  v1: {
    authentication: `${baseUrl}/v1/authentication`,
    login: `${baseUrl}/v1/authentication/login`,
    refreshToken: `${baseUrl}/v1/authentication/token/refresh`,
  },
});

const getUserEndpoints = (baseUrl: string) => ({
  v1: {
    user: `${baseUrl}/v1/user`,
    pokemonCatch: `${baseUrl}/v1/user/pokemon/catch`,
  },
});

const getPokemonEndpoints = (baseUrl: string, host: string) => ({
  v1: {
    pokemon: (pokemonIdOrName: string | number) => `${host}/v2/pokemon/${pokemonIdOrName}`,
    lastUpdated: `${baseUrl}/v1/pokemon/last-updated`,
  },
});

const getAnalyticsEndpoints = (baseUrl: string) => ({
  v1: {
    realtimeUsers: `${baseUrl}/v1/analytics/realtime-users`,
  },
});

export const getEndpoints = () => {
  const environment = inject<Environment>(ENVIRONMENT);
  const POKEMON_API_HOST = 'https://pokeapi.co/api';
  return {
    auth: getAuthEndpoints(environment.apiBaseUrl),
    user: getUserEndpoints(environment.apiBaseUrl),
    pokemon: getPokemonEndpoints(environment.apiBaseUrl, POKEMON_API_HOST),
    analytics: getAnalyticsEndpoints(environment.apiBaseUrl),
  } as const;
};
