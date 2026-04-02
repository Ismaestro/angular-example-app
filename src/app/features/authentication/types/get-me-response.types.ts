import type { User } from '~features/authentication/types/user.types';
import type { ApiResponse } from '~shared/types/api-response.types';

export type GetMeResponseData = {
  user: User;
};

export type GetMeResponse = ApiResponse<GetMeResponseData>;
