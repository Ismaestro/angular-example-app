import { OkData } from '~modules/shared/interfaces/ok-data.interface';

export interface DeleteAccountResponse {
  errors?: unknown;
  data?: {
    deleteAccount: OkData;
  };
}
