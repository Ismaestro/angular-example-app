import { User } from '~modules/user/shared/user.model';

export interface UpdateUserResponse {
  errors?: unknown;
  data?: {
    updateUser: User;
  };
}
