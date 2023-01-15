export interface RefreshTokenResponse {
  errors?: unknown;
  data?: {
    refreshToken: {
      accessToken: string;
      refreshToken: string;
    };
  };
}
