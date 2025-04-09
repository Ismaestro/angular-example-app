import { environment } from '~environments/environment';

const API_BASE_URL = environment.apiBaseUrl;
const POKEMON_API_HOST = 'https://pokeapi.co/api';

export const AUTH_ENDPOINTS = {
  V1: {
    authentication: `${API_BASE_URL}/v1/authentication`,
    login: `${API_BASE_URL}/v1/authentication/login`,
    refreshToken: `${API_BASE_URL}/v1/authentication/token/refresh`,
  },
};

export const USER_ENDPOINTS = {
  V1: {
    user: `${API_BASE_URL}/v1/user`,
    userPokemonCatch: `${API_BASE_URL}/v1/user/pokemon/catch`,
  },
};

export const POKEMON_ENDPOINTS = {
  V2: {
    pokemon: (pokemonIdOrName: string | number) =>
      `${POKEMON_API_HOST}/v2/pokemon/${pokemonIdOrName}`,
  },
};
