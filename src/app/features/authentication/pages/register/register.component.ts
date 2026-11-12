import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import type { SchemaPathTree } from '@angular/forms/signals';
import { form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { firstValueFrom, switchMap, timer } from 'rxjs';
import { AUTH_URLS, POKEMON_URLS, USER_URLS } from '~core/constants/urls.constants';
import { validateEmail } from '~shared/validators/email.validator';
import { validatePasswordStrength } from '~shared/validators/password.validator';
import { validatePasswordsMatch } from '~shared/validators/passwords-match.validator';
import { SlInputIconFocusDirective } from '~shared/directives/sl-input-icon-focus.directive';
import { AppSlCheckboxControlDirective } from '~shared/directives/sl-checkbox-control.directive';
import { AppSlInputControlDirective } from '~shared/directives/sl-input-control.directive';
import { AlertService } from '~core/services/ui/alert.service';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { PokemonService } from '~features/pokemon/services/pokemon.service';
import { validatePokemonName } from '~features/pokemon/validators/pokemon-name.validator';
import { translations } from '~locale/translations';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';

const POKEMON_APPEAR_SOUND_URL =
  'https://res.cloudinary.com/ismaestro/video/upload/v1735370897/angularexampleapp/assets/sounds/battle-effect_gqckbf.mp3';
const POKEMON_APPEAR_ANIMATION_MS = 2300;
const LAST_POKEMON_ID = 1025;

type RegisterFormModel = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  favouritePokemonName: string;
  terms: boolean;
};

function validateAccount(path: SchemaPathTree<RegisterFormModel>): void {
  required(path.name);
  minLength(path.name, 2);
  required(path.email);
  minLength(path.email, 4);
  validateEmail(path.email);
  required(path.password);
  validatePasswordStrength(path.password);
  required(path.confirmPassword);
  validatePasswordStrength(path.confirmPassword);
  validatePasswordsMatch(path.confirmPassword, path.password);
}

function validateFavouritePokemon(
  path: SchemaPathTree<RegisterFormModel>,
  pokemonService: PokemonService,
): void {
  required(path.favouritePokemonName);
  minLength(path.favouritePokemonName, 2);
  validatePokemonName(path.favouritePokemonName, pokemonService);
  // `required` also rejects `false`, so the terms must be accepted
  required(path.terms);
}

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    FormField,
    FormRoot,
    NgOptimizedImage,
    SlInputIconFocusDirective,
    AppSlInputControlDirective,
    AppSlCheckboxControlDirective,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthenticationService);
  private readonly pokemonService = inject(PokemonService);
  private readonly alertService = inject(AlertService);
  private readonly destroyRef = inject(DestroyRef);

  readonly translations = translations;
  readonly authUrls = AUTH_URLS;
  readonly isRegistrationCompleted = signal(false);

  private readonly registerModel = signal<RegisterFormModel>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    favouritePokemonName: '',
    terms: false,
  });
  readonly registerForm = form(
    this.registerModel,
    (path) => {
      validateAccount(path);
      validateFavouritePokemon(path, this.pokemonService);
    },
    {
      submission: {
        action: async () => this.register(),
        // Wait for the async validation of the pokemon name instead of submitting while it runs
        ignoreValidators: 'none',
      },
    },
  );
  // Stays on after the request ends: the user is about to be redirected
  readonly isLoading = computed(
    () => this.registerForm().submitting() || this.isRegistrationCompleted(),
  );

  readonly isPasswordsMismatch = computed(() =>
    this.registerForm
      .confirmPassword()
      .errors()
      .some((error) => error.kind === 'passwordsMismatch'),
  );

  private async register(): Promise<void> {
    try {
      await firstValueFrom(this.registerUser());
    } catch {
      this.alertService.createErrorAlert(translations.genericErrorAlert);
      return;
    }
    await this.celebrateRegistration();
  }

  private registerUser() {
    const { name, email, password, terms, favouritePokemonName } = this.registerModel();
    return (
      this.pokemonService
        // Already validated (and cached by the HTTP cache): this only resolves the pokemon id
        .getPokemon(favouritePokemonName.trim().toLowerCase())
        .pipe(
          switchMap((pokemon) =>
            this.authService.register({
              name,
              email,
              password,
              terms,
              favouritePokemonId: pokemon.id,
            }),
          ),
        )
    );
  }

  private async celebrateRegistration(): Promise<void> {
    const pokemonAppearAudio = new Audio(POKEMON_APPEAR_SOUND_URL);
    pokemonAppearAudio.volume = 0.1;
    try {
      await pokemonAppearAudio.play();
    } catch {
      await this.router.navigate([USER_URLS.myPokemon]);
      return;
    }

    this.isRegistrationCompleted.set(true);
    timer(POKEMON_APPEAR_ANIMATION_MS)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const randomPokemonId = Math.floor(Math.random() * LAST_POKEMON_ID) + 1;
        void this.router.navigate([POKEMON_URLS.detail(String(randomPokemonId))]);
      });
  }
}
