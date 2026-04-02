import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';
import { CACHING_ENABLED } from '~core/interceptors/caching.interceptor';
import type { GetMeResponse } from '~features/authentication/types/get-me-response.types';
import type { UpdateUserRequest } from '~features/authentication/types/update-user-request.types';
import type { UpdateUserResponse } from '~features/authentication/types/update-user-response.types';
import type { CatchPokemonRequest } from '~features/authentication/types/catch-pokemon-request.types';
import type { CatchPokemonResponse } from '~features/authentication/types/catch-pokemon-response.types';
import type { User } from '~features/authentication/types/user.types';
import { getEndpoints } from '~core/constants/endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly endpoints = getEndpoints();

  getMe(options?: { cache?: boolean }): Observable<User> {
    const cache = options?.cache ?? true;

    return this.http
      .get<GetMeResponse>(this.endpoints.user.v1.user, {
        context: this.createCacheContext(cache),
      })
      .pipe(this.extractUser());
  }

  updateUser(updateUserRequest: UpdateUserRequest): Observable<User> {
    return this.http
      .patch<UpdateUserResponse>(this.endpoints.user.v1.user, updateUserRequest)
      .pipe(this.extractUser());
  }

  catchPokemon(catchPokemonRequest: CatchPokemonRequest): Observable<User> {
    return this.http
      .post<CatchPokemonResponse>(this.endpoints.user.v1.pokemonCatch, catchPokemonRequest)
      .pipe(this.extractUser());
  }

  private extractUser<T extends { data: { user: User } }>() {
    return map((response: T) => response.data.user);
  }

  private createCacheContext(cache: boolean): HttpContext {
    return new HttpContext().set(CACHING_ENABLED, cache);
  }
}
