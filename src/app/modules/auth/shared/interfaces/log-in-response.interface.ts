import { User } from '~modules/user/shared/user.model';

export interface LogInResponse {
  errors?: unknown;
  data?: {
    login: {
      accessToken: string;
      refreshToken: string;
      user: User;
    };
  };
}
