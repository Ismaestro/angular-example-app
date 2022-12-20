import { User } from '~modules/user/shared/user.model';

export interface AuthProps {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}
