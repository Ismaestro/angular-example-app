export interface UpdateTokenResponse {
  errors?: unknown;
  data?: {
    updateToken: {
      accessToken: string;
      refreshToken: string;
    };
  };
}
