import { User } from '~modules/user/shared/user.model';

export interface GetMeResponse {
  errors?: unknown;
  data?: {
    me: User;
  };
}
