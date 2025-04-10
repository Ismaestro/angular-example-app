import type { User } from '~features/authentication/types/user.type';
import type { ApiResponse } from '~core/types/api-response.types';

export type RegisterResponseData = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type RegisterResponse = ApiResponse<RegisterResponseData>;
