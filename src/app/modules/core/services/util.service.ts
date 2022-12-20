import { Injectable } from '@angular/core';
import { ApolloError } from '@apollo/client/errors';
import { AlertId, AlertService } from '~modules/core/services/alert.service';
import { CustomError } from '~modules/auth/shared/interfaces/custom-errors.enum';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private alertService: AlertService) {}

  checkNetworkError(error: ApolloError): boolean {
    if (error.networkError) {
      this.alertService.create(AlertId.NETWORK_ERROR, { code: CustomError.NETWORK_ERROR });
    }

    return !!error.networkError;
  }
}
