import type { User } from '~features/authentication/types/user.type';
import type { ApiResponse } from '~shared/types/api-response.types';

export type CatchPokemonResponseData = {
  user: User;
};

export type CatchPokemonResponse = ApiResponse<CatchPokemonResponseData>;
