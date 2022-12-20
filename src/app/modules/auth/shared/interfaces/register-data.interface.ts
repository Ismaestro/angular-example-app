import { User } from '~modules/user/shared/user.model';

export interface AuthUserData {
  accessToken: string;
  refreshToken: string;
  user: User;
}
