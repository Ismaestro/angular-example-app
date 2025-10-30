import type { ApiResponse } from '~shared/types/api-response.types';

export type LastUpdatedPokemonIdsResponseData = {
  pokemonIds: string[];
};

export type LastUpdatedPokemonIdsResponse = ApiResponse<LastUpdatedPokemonIdsResponseData>;
