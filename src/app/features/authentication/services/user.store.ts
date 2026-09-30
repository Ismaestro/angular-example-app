import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { UserService } from '~features/authentication/services/user.service';
import type { User } from '~features/authentication/types/user.types';

/**
 * Single source of truth for the logged-in user. The user is fetched while there is a session
 * (the resource goes back to idle on log out), and every mutation updates it locally, so the
 * components reading it never need to refetch it.
 */
@Injectable({ providedIn: 'root' })
export class UserStore {
  private readonly userService = inject(UserService);
  private readonly authenticationService = inject(AuthenticationService);

  readonly user = rxResource({
    params: () => this.authenticationService.authState().isLoggedIn || undefined,
    stream: () => this.userService.getMe({ cache: false }),
  });

  catchPokemon(pokemonId: number): Observable<User> {
    return this.userService.catchPokemon({ pokemonId }).pipe(
      tap((user) => {
        this.user.set(user);
      }),
    );
  }
}
