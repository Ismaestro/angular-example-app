import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, merge } from 'rxjs';
import { AUTH_URLS, POKEMON_URLS, ROOT_URLS } from '~core/constants/urls.constants';
import { emailValidator } from '~core/validators/email.validator';
import { passwordValidator } from '~core/validators/password.validator';
import { PokemonValidator } from '~core/validators/pokemon.validator';
import { SlInputIconFocusDirective } from '~core/directives/sl-input-icon-focus.directive';
import { AppSlCheckboxControlDirective } from '~core/directives/sl-checkbox-control.directive';
import { LowercaseDirective } from '~core/directives/lowercase.directive';
import { TrimDirective } from '~core/directives/trim.directive';
import { AlertStore } from '~core/services/ui/alert.store';
import { AuthenticationService } from '../../services/authentication.service';
import type {
  RegisterFormGroup,
  RegisterFormState,
  RegisterFormValue,
} from './register-form.types';
import { translations } from '../../../../../locale/translations';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    SlInputIconFocusDirective,
    AppSlCheckboxControlDirective,
    LowercaseDirective,
    TrimDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthenticationService);
  private readonly alertStore = inject(AlertStore);
  private readonly pokemonValidator = inject(PokemonValidator);
  private readonly destroyRef = inject(DestroyRef);

  private readonly pokemonAppearAudio = new Audio(
    'https://res.cloudinary.com/ismaestro/video/upload/v1735370897/angularexampleapp/assets/sounds/battle-effect_gqckbf.mp3',
  );

  readonly translations = translations;
  readonly authUrls = AUTH_URLS;
  readonly registerForm = this.createRegisterForm();
  readonly formControls = {
    name: this.registerForm.get('name') as FormControl<string>,
    email: this.registerForm.get('email') as FormControl<string>,
    password: this.registerForm.get('password') as FormControl<string>,
    confirmPassword: this.registerForm.get('confirmPassword') as FormControl<string>,
    favouritePokemonId: this.registerForm.get('favouritePokemonId') as FormControl<string>,
    terms: this.registerForm.get('terms') as FormControl<boolean | null>,
  };
  readonly formState = signal<RegisterFormState>({
    isLoading: false,
    isSubmitted: false,
    isRegistrationCompleted: false,
    passwordsMatch: false,
    isPokemonValidating: this.pokemonValidator.isPokemonValidating,
  });

  constructor() {
    this.pokemonAppearAudio.volume = 0.1;
    this.formControls.favouritePokemonId.setErrors({ pokemonName: true });
  }

  ngOnInit() {
    merge(this.formControls.password.valueChanges, this.formControls.confirmPassword.valueChanges)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.checkPasswords();
      });
  }

  sendForm(): void {
    this.updateFormState({ isSubmitted: true });

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.updateFormState({ isLoading: true });

    this.authService
      .register({
        ...this.registerForm.getRawValue(),
        favouritePokemonId: Number(this.pokemonValidator.pokemonId()),
      } as RegisterFormValue)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(() => {
          this.handleRegistrationError();
          return EMPTY;
        }),
      )
      .subscribe(() => {
        this.handleRegistrationSuccess();
      });
  }

  // eslint-disable-next-line max-lines-per-function
  private createRegisterForm(): RegisterFormGroup {
    return this.formBuilder.group({
      name: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(2)],
        nonNullable: true,
      }),
      email: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(4), emailValidator()],
        nonNullable: true,
      }),
      password: new FormControl<string>('', {
        validators: [Validators.required, passwordValidator()],
        updateOn: 'change',
        nonNullable: true,
      }),
      confirmPassword: new FormControl<string>('', {
        validators: [Validators.required, passwordValidator()],
        updateOn: 'change',
        nonNullable: true,
      }),
      favouritePokemonId: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(2)],
        asyncValidators: [this.pokemonValidator.validate.bind(this.pokemonValidator)],
        updateOn: 'change',
        nonNullable: true,
      }),
      terms: new FormControl<boolean | null>(null, {
        validators: [Validators.requiredTrue],
      }),
    });
  }

  private checkPasswords(): void {
    if (this.formControls.password.value === this.formControls.confirmPassword.value) {
      this.updateFormState({ passwordsMatch: true });
      this.formControls.confirmPassword.setErrors(null);
    } else {
      this.updateFormState({
        passwordsMatch: false,
      });
      this.formControls.confirmPassword.setErrors({ notEqual: true });
    }
  }

  private handleRegistrationSuccess() {
    this.pokemonAppearAudio
      .play()
      .then(() => {
        this.updateFormState({ isRegistrationCompleted: true });
        const ANIMATION_END_TIME = 2300;
        setTimeout(() => {
          const LAST_POKEMON_ID = 1025;
          void this.router.navigate([
            POKEMON_URLS.detail(String(this.getRandomNumber(1, LAST_POKEMON_ID))),
          ]);
        }, ANIMATION_END_TIME);
        return true;
      })
      .catch(() => {
        void this.router.navigate([ROOT_URLS.myPokedex]);
      });
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private handleRegistrationError(): void {
    this.alertStore.createErrorAlert(translations.genericErrorAlert);
    this.updateFormState({ isLoading: false });
  }

  private updateFormState(updates: Partial<RegisterFormState>): void {
    this.formState.update((state) => ({ ...state, ...updates }));
  }
}
