import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfig } from '../../configs/app.config';
import { CookieService } from '@gorniv/ngx-universal';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { UtilsService } from '../../shared/services/utils.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private snackBar: MatSnackBar,
              private apollo: Apollo,
              private utilsService: UtilsService,
              private cookieService: CookieService) {
  }

  isLoggedIn(): boolean {
    try {
      return !!jwt_decode(this.cookieService.get('accessToken'));
    } catch (Error) {
      return null;
    }
  }

  checkIfUserCanVote(): boolean {
    const votes = this.cookieService.get('votes');
    return Number(votes ? votes : 0) < AppConfig.votesLimit;
  }

  signUp(firstName: string, lastName: string, email: string, password: string): Observable<{ accessToken, refreshToken }> {
    return this.apollo.mutate({
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
      `
    }).pipe(map((response: any) => {
      return !response.errors ? response.data.signup : response;
    }));
  }

  logIn(email: string, password: string): Observable<{ accessToken, refreshToken }> {
    return this.apollo.mutate({
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
      `
    }).pipe(map((response: any) => {
      if (!response.errors) {
        const loginData = response.data.login;
        const { accessToken, refreshToken } = loginData;
        this.cookieService.put('accessToken', accessToken);
        this.cookieService.put('refreshToken', refreshToken);
        this.utilsService.showSnackBar('Nice! Let\'s create some heroes', 'info-snack-bar');
        return loginData;
      } else {
        return response;
      }
    }));
  }
}
