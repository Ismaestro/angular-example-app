import type { ApiResponse } from '~shared/types/api-response.types';

export type RefreshTokenResponseData = {
  accessToken: string;
};

export type RefreshTokenResponse = ApiResponse<RefreshTokenResponseData>;
