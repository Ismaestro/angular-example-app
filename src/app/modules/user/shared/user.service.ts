import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '~modules/user/shared/user.model';
import { getMeQuery } from '~modules/user/shared/user-queries.graphql';
import { GetMeResponse } from '~modules/user/interfaces/get-me-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

  getMe(): Observable<User | null> {
    return this.apollo
      .query({
        query: getMeQuery,
      })
      .pipe(
        map((response: unknown) => {
          return (response as GetMeResponse).data?.me ?? null;
        }),
      );
  }
}
