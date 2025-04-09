import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';
import { CACHING_ENABLED } from '~core/interceptors/caching.interceptor';
import type { GetMeResponse } from '~features/authentication/types/get-me-response.type';
import type { User } from '~features/authentication/types/user.type';
import type { UpdateUserRequest } from '~features/authentication/types/update-user-request.type';
import type { UpdateUserResponse } from '~features/authentication/types/update-user-response.type';
import type { CatchPokemonRequest } from '~features/authentication/types/catch-pokemon-request.type';
import type { CatchPokemonResponse } from '~features/authentication/types/catch-pokemon-response.type';
import { getEndpoints } from '~core/constants/endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly endpoints = getEndpoints();
  private readonly httpClient = inject(HttpClient);

  getMe(options?: { cache: boolean }): Observable<User> {
    const { cache = true } = options ?? {};
    return this.httpClient
      .get<GetMeResponse>(this.endpoints.user.v1.user, {
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
    return this.httpClient
      .patch<UpdateUserResponse>(this.endpoints.user.v1.user, updateUserRequest)
      .pipe(
        map((response: UpdateUserResponse) => {
          const { data } = response;
          return data.user;
        }),
      );
  }

  catchPokemon(catchPokemonRequest: CatchPokemonRequest): Observable<User> {
    return this.httpClient
      .post<CatchPokemonResponse>(this.endpoints.user.v1.pokemonCatch, catchPokemonRequest)
      .pipe(
        map((response: CatchPokemonResponse) => {
          const { data } = response;
          return data.user;
        }),
      );
  }
}
