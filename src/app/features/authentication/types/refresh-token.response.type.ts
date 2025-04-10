import type { ApiResponse } from '~core/types/api-response.types';

export type RefreshTokenResponseData = {
  accessToken: string;
};

export type RefreshTokenResponse = ApiResponse<RefreshTokenResponseData>;
