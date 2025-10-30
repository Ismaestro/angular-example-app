import type { User } from '~features/authentication/types/user.type';
import type { ApiResponse } from '~shared/types/api-response.types';

export type LoginResponseData = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type LoginResponse = ApiResponse<LoginResponseData>;
