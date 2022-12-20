import { OkData } from '~modules/shared/interfaces/ok-data.interface';

export interface ChangePasswordResponse {
  errors?: unknown;
  data?: {
    changePassword: OkData;
  };
}
