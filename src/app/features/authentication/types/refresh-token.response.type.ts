import type { ApiResponse } from '~core/types/api-response.type';

export type RefreshTokenResponseData = {
  accessToken: string;
};

export type RefreshTokenResponse = ApiResponse<RefreshTokenResponseData>;
