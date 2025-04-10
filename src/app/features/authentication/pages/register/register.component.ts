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
import { AUTH_URLS, POKEMON_URLS, ROOT_URLS } from '~core/constants/urls.constants';
import { emailValidator } from '~core/validators/email.validator';
import { passwordValidator } from '~core/validators/password.validator';
import { PokemonValidator } from '~core/validators/pokemon.validator';
import { NgOptimizedImage } from '@angular/common';
import { SlInputIconFocusDirective } from '~core/directives/sl-input-icon-focus.directive';
import { translations } from '../../../../../locale/translations';
import { merge } from 'rxjs';
import { AppSlCheckboxControlDirective } from '~core/directives/sl-checkbox-control.directive';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { AlertService } from '~core/services/ui/alert.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LowercaseDirective } from '~core/directives/lowercase.directive';
import { TrimDirective } from '~core/directives/trim.directive';

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
  private readonly alertService = inject(AlertService);
  private readonly pokemonValidator = inject(PokemonValidator);
  private readonly destroyRef = inject(DestroyRef);

  readonly isButtonRegisterLoading = signal(false);
  readonly isPokemonValidating = this.pokemonValidator.isPokemonValidating;
  readonly registrationCompleted = signal(false);

  translations = translations;
  pokemonAppearAudio!: HTMLAudioElement;
  authUrls = AUTH_URLS;
  name = new FormControl('', [Validators.required, Validators.minLength(2)]);
  email = new FormControl('', [Validators.required, Validators.minLength(4), emailValidator()]);
  password = new FormControl('', {
    validators: [Validators.required, passwordValidator()],
    updateOn: 'change',
  });
  confirmPassword = new FormControl('', {
    validators: [Validators.required, passwordValidator()],
    updateOn: 'change',
  });
  favouritePokemon = new FormControl('', {
    validators: [Validators.required, Validators.minLength(2)],
    asyncValidators: [this.pokemonValidator.validate.bind(this.pokemonValidator)],
    updateOn: 'change',
  });
  terms = new FormControl(null, [Validators.requiredTrue]);
  registerForm = this.formBuilder.group({
    name: this.name,
    email: this.email,
    password: this.password,
    confirmPassword: this.confirmPassword,
    favouritePokemon: this.favouritePokemon,
    terms: this.terms,
  });
  confirmPasswordHelpText = '';

  ngOnInit() {
    this.favouritePokemon.setErrors({ pokemonName: true });
    merge(this.password.valueChanges, this.confirmPassword.valueChanges)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.checkPasswords();
      });
    this.pokemonAppearAudio = new Audio(
      'https://res.cloudinary.com/ismaestro/video/upload/v1735370897/angularexampleapp/assets/sounds/battle-effect_gqckbf.mp3',
    );
    this.pokemonAppearAudio.volume = 0.1;
  }

  checkPasswords() {
    const areValuesEqual = this.password.value === this.confirmPassword.value;
    if (areValuesEqual && this.confirmPassword.getRawValue()) {
      this.confirmPasswordHelpText = '';
      this.confirmPassword.setErrors(null);
    } else {
      if (this.confirmPassword.touched) {
        this.confirmPasswordHelpText = translations.confirmPasswordHelpText;
      }
      this.confirmPassword.setErrors({ mismatch: true });
    }
  }

  sendForm() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      this.isButtonRegisterLoading.set(true);
      const formValue = this.registerForm.getRawValue();
      this.authService
        .register({
          email: formValue.email!,
          password: formValue.password!,
          name: formValue.name!,
          favouritePokemonId: this.pokemonValidator.pokemonId(),
          terms: formValue.terms!,
        })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.playSoundAndNavigate();
          },
          error: () => {
            this.isButtonRegisterLoading.set(false);
            this.alertService.createErrorAlert(translations.genericRegisterError);
          },
        });
    }
  }

  private playSoundAndNavigate() {
    this.pokemonAppearAudio
      .play()
      .then(() => {
        this.registrationCompleted.set(true);
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
}
