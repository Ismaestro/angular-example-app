import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '~environments/environment';
import { CACHING_ENABLED } from '~core/interceptors/caching.interceptor';
import type { GetMeResponse } from '~features/authentication/types/get-me-response.type';
import type { User } from '~features/authentication/types/user.type';
import type { UpdateUserRequest } from '~features/authentication/types/update-user-request.type';
import type { UpdateUserResponse } from '~features/authentication/types/update-user-response.type';
import type { CatchPokemonRequest } from '~features/authentication/types/catch-pokemon-request.type';
import type { CatchPokemonResponse } from '~features/authentication/types/catch-pokemon-response.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);

  private readonly apiUrl = environment.apiBaseUrl;

  getMe(options?: { cache: boolean }): Observable<User> {
    const { cache = true } = options ?? {};
    const getMeEndpoint = `${this.apiUrl}/v1/user`;
    return this.httpClient
      .get<GetMeResponse>(getMeEndpoint, {
        context: new HttpContext().set(CACHING_ENABLED, cache),
      })
      .pipe(
        map((response: GetMeResponse) => {
          const { data } = response;
          return data.user;
        }),
      );
  }

  updateUser(updateUserRequest: UpdateUserRequest): Observable<User> {
    const updateUserEndpoint = `${this.apiUrl}/v1/user`;
    return this.httpClient.patch<UpdateUserResponse>(updateUserEndpoint, updateUserRequest).pipe(
      map((response: UpdateUserResponse) => {
        const { data } = response;
        return data.user;
      }),
    );
  }

  catchPokemon(catchPokemonRequest: CatchPokemonRequest): Observable<User> {
    const catchPokemonEndpoint = `${this.apiUrl}/v1/user/pokemon/catch`;
    return this.httpClient
      .post<CatchPokemonResponse>(catchPokemonEndpoint, catchPokemonRequest)
      .pipe(
        map((response: CatchPokemonResponse) => {
          const { data } = response;
          return data.user;
        }),
      );
  }
}
