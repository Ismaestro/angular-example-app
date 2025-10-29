import type { ApiResponse } from '~core/types/api-response.types';

export type LastUpdatedPokemonIdsResponseData = {
  pokemonIds: string[];
};

export type LastUpdatedPokemonIdsResponse = ApiResponse<LastUpdatedPokemonIdsResponseData>;
