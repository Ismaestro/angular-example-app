import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { UserService } from '~features/authentication/services/user.service';
import type { UpdateUserRequest } from '~features/authentication/types/update-user-request.types';
import type { User } from '~features/authentication/types/user.types';

/**
 * Single source of truth for the logged-in user. The user is fetched while there is a session
 * (the resource goes back to idle on log out), and every mutation updates it locally, so the
 * components reading it never need to refetch it nor to bypass any HTTP cache.
 */
@Injectable({ providedIn: 'root' })
export class UserStore {
  private readonly userService = inject(UserService);
  private readonly authenticationService = inject(AuthenticationService);

  private readonly userResource = rxResource({
    params: () => this.authenticationService.authState().isLoggedIn || undefined,
    stream: () => this.userService.getMe(),
  });

  /** Read-only: the user can only be changed through the methods of this store */
  readonly user = this.userResource.asReadonly();

  catchPokemon(pokemonId: number): Observable<User> {
    return this.userService.catchPokemon({ pokemonId }).pipe(tap(this.setUser));
  }

  updateUser(updateUserRequest: UpdateUserRequest): Observable<User> {
    return this.userService.updateUser(updateUserRequest).pipe(tap(this.setUser));
  }

  private readonly setUser = (user: User) => {
    this.userResource.set(user);
  };
}
