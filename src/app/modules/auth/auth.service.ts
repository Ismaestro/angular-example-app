import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { StorageKey, StorageService } from '~shared/services/storage.service';
import { UtilsService } from '~modules/core/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private snackBar: MatSnackBar,
    private apollo: Apollo,
    private utilsService: UtilsService,
    private storageService: StorageService
  ) {}

  isLoggedIn(): boolean {
    try {
      const token = this.storageService.getCookie(StorageKey.ACCESS_TOKEN);
      if (token) {
        return !!jwt_decode(token);
      }
      return false;
    } catch (Error) {
      return false;
    }
  }

  signUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<{ accessToken: string; refreshToken: string }> {
    return this.apollo
      .mutate({
        mutation: gql`
        mutation signUp {
          signup(data: {
            email: "${email}"
            firstname: "${firstName}"
            lastname: "${lastName}"
            password: "${password}"
          }) {
            accessToken
            refreshToken
          }
        }
      `,
      })
      .pipe(
        map((response: any) => {
          return !response.errors ? response.data.signup : response;
        })
      );
  }

  logIn(
    email: string,
    password: string
  ): Observable<{ accessToken: string; refreshToken: string }> {
    return this.apollo
      .mutate({
        mutation: gql`
        mutation logIn {
          login(data: {
            email: "${email}"
            password: "${password}"
          }) {
            accessToken
            refreshToken
          }
        }
      `,
      })
      .pipe(
        map((response: any) => {
          if (!response.errors) {
            const loginData = response.data.login;
            const { accessToken, refreshToken } = loginData;
            this.storageService.setCookie(StorageKey.ACCESS_TOKEN, accessToken);
            this.storageService.setCookie(StorageKey.REFRESH_TOKEN, refreshToken);
            this.utilsService.showSnackBar("Nice! Let's create some heroes", 'info-snack-bar');
            return loginData;
          } else {
            return response;
          }
        })
      );
  }
}
