import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, timer } from 'rxjs';
import { AUTH_URLS, POKEMON_URLS, USER_URLS } from '~core/constants/urls.constants';
import { emailValidator } from '~shared/validators/email.validator';
import { passwordValidator } from '~shared/validators/password.validator';
import { passwordsMatchValidator } from '~shared/validators/passwords-match.validator';
import { SlInputIconFocusDirective } from '~shared/directives/sl-input-icon-focus.directive';
import { AppSlCheckboxControlDirective } from '~shared/directives/sl-checkbox-control.directive';
import { LowercaseDirective } from '~shared/directives/lowercase.directive';
import { TrimDirective } from '~shared/directives/trim.directive';
import { AlertService } from '~core/services/ui/alert.service';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { PokemonService } from '~features/pokemon/services/pokemon.service';
import { pokemonNameValidator } from '~features/pokemon/validators/pokemon-name.validator';
import { translations } from '~locale/translations';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';

const POKEMON_APPEAR_SOUND_URL =
  'https://res.cloudinary.com/ismaestro/video/upload/v1735370897/angularexampleapp/assets/sounds/battle-effect_gqckbf.mp3';
const POKEMON_APPEAR_ANIMATION_MS = 2300;
const LAST_POKEMON_ID = 1025;

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgOptimizedImage,
    SlInputIconFocusDirective,
    AppSlCheckboxControlDirective,
    LowercaseDirective,
    TrimDirective,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterComponent {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthenticationService);
  private readonly pokemonService = inject(PokemonService);
  private readonly alertService = inject(AlertService);
  private readonly destroyRef = inject(DestroyRef);

  readonly translations = translations;
  readonly authUrls = AUTH_URLS;
  readonly isLoading = signal(false);
  readonly isRegistrationCompleted = signal(false);

  // The form type is inferred: no casts nor hand-written FormGroup types are needed
  readonly registerForm = this.formBuilder.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.minLength(4), emailValidator()]],
      password: ['', [Validators.required, passwordValidator()]],
      confirmPassword: ['', [Validators.required, passwordValidator()]],
      favouritePokemonName: [
        '',
        {
          validators: [Validators.required, Validators.minLength(2)],
          asyncValidators: [pokemonNameValidator(this.pokemonService)],
        },
      ],
      terms: [false, [Validators.requiredTrue]],
    },
    { validators: [passwordsMatchValidator('password', 'confirmPassword')] },
  );
  readonly controls = this.registerForm.controls;

  sendForm(): void {
    // `valid` (not `!invalid`): a form is neither valid nor invalid while an async validator runs
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.registerUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          void this.celebrateRegistration();
        },
        error: () => {
          this.isLoading.set(false);
          this.alertService.createErrorAlert(translations.genericErrorAlert);
        },
      });
  }

  private registerUser() {
    const { name, email, password, terms, favouritePokemonName } = this.registerForm.getRawValue();
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
