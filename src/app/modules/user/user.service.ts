import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { User } from './shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) {
  }

  getMe({fetchPolicy}): Observable<User> {
    return this.apollo
    .watchQuery({
      query: gql`
        query Me {
          me {
            id
            email
            firstname
            lastname
            heroes {
              id
              realName
              alterEgo
            }
          }
        }
      `,
      fetchPolicy
    })
    .valueChanges.pipe(map((result: any) => new User(result.data.me)));
  }
}
