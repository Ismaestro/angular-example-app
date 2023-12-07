import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LogInResponse } from '~modules/auth/shared/interfaces/log-in-response.interface';
import { AuthRepository } from '~modules/auth/store/auth.repository';
import {
  changePasswordMutation,
  deleteAccountMutation,
  loginMutation,
  refreshTokenMutation,
  signupMutation,
  updateUserMutation,
} from '~modules/auth/shared/auth-mutations.graphql';
import { User } from '~modules/user/shared/user.model';
import { RegisterPayload } from '~modules/auth/shared/interfaces/register-payload.interface';
import { RegisterResponse } from '~modules/auth/shared/interfaces/register-response.interface';
import { AuthUserData } from '~modules/auth/shared/interfaces/register-data.interface';
import { OkData } from '~modules/shared/interfaces/ok-data.interface';
import { UpdateUserResponse } from '~modules/auth/shared/interfaces/update-user-response.interface';
import { UpdateUserData } from '~modules/auth/shared/interfaces/update-user-data.interface';
import { RefreshTokenResponse } from '~modules/auth/shared/interfaces/update-token-response.interface';
import { UpdateTokenData } from '~modules/auth/shared/interfaces/update-token-data.interface';
import { ChangePasswordResponse } from '~modules/auth/shared/interfaces/change-password-response.interface';
import { DeleteAccountResponse } from '~modules/auth/shared/interfaces/delete-account-response.interface';
import { AppConfig } from '../../../configs/app.config';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apollo: Apollo,
    private authRepository: AuthRepository,
  ) {}

  static decodeToken(token: string): { exp: number } | null {
    try {
      return jwtDecode(token);
    } catch (e) {
      return null;
    }
  }

  signup({ firstname, email, password }: RegisterPayload): Observable<AuthUserData | null> {
    return this.apollo
      .mutate({
        mutation: signupMutation,
        variables: {
          firstname,
          email,
          password,
        },
      })
      .pipe(
        map((response: unknown) => {
          const registerData = (response as RegisterResponse).data?.signup;
          if (registerData) {
            this.saveUserData(registerData);
            return registerData;
          }
          return null;
        }),
      );
  }

  logIn(email: string, password: string): Observable<AuthUserData | null> {
    return this.apollo
      .mutate({
        mutation: loginMutation,
        variables: {
          email,
          password,
        },
      })
      .pipe(
        map((response: unknown) => {
          const loginData = (response as LogInResponse).data?.login;
          if (loginData) {
            this.saveUserData(loginData);
            return loginData;
          }
          return null;
        }),
      );
  }

  updateUser(userData: UpdateUserData): Observable<User | null> {
    return this.apollo
      .mutate({
        mutation: updateUserMutation,
        variables: userData,
      })
      .pipe(
        map((response: unknown) => {
          const updateUserData = (response as UpdateUserResponse).data?.updateUser;
          if (updateUserData) {
            this.authRepository.setUser(updateUserData);
            return updateUserData;
          }
          return null;
        }),
      );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<OkData | null> {
    return this.apollo
      .mutate({
        mutation: changePasswordMutation,
        variables: {
          oldPassword,
          newPassword,
        },
      })
      .pipe(
        map((response: unknown) => {
          const changePasswordData = (response as ChangePasswordResponse).data?.changePassword;
          if (changePasswordData) {
            return changePasswordData;
          }
          return null;
        }),
      );
  }

  deleteAccount(password: string): Observable<OkData | null> {
    return this.apollo
      .mutate({
        mutation: deleteAccountMutation,
        variables: {
          password,
        },
      })
      .pipe(
        map((response: unknown) => {
          const deleteAccountData = (response as DeleteAccountResponse).data?.deleteAccount;
          if (deleteAccountData) {
            return deleteAccountData;
          }
          return null;
        }),
      );
  }

  refreshToken(): Observable<UpdateTokenData | null> {
    const refreshToken = this.authRepository.getRefreshTokenValue() ?? '';
    return this.apollo
      .mutate({
        mutation: refreshTokenMutation,
        context: {
          headers: { [AppConfig.bypassAuthorization]: 'true' },
        },
        variables: {
          refreshToken,
        },
      })
      .pipe(
        map((response: unknown) => {
          const refreshTokenData = (response as RefreshTokenResponse).data?.refreshToken;
          if (refreshTokenData) {
            this.authRepository.updateTokens(
              refreshTokenData.accessToken,
              refreshTokenData.refreshToken,
            );
            return refreshTokenData;
          }
          return null;
        }),
      );
  }

  private saveUserData(userData: AuthUserData) {
    this.authRepository.updateTokens(userData.accessToken, userData.refreshToken);
    this.authRepository.setUser(userData.user);
  }
}
