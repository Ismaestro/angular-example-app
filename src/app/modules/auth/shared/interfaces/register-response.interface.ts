import { User } from '~modules/user/shared/user.model';

export interface RegisterResponse {
  errors?: unknown;
  data?: {
    signup: {
      accessToken: string;
      refreshToken: string;
      user: User;
    };
  };
}
