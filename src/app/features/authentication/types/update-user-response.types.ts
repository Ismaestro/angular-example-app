import type { User } from '~features/authentication/types/user.types';
import type { ApiResponse } from '~shared/types/api-response.types';

export type UpdateUserResponseData = {
  user: User;
};

export type UpdateUserResponse = ApiResponse<UpdateUserResponseData>;
