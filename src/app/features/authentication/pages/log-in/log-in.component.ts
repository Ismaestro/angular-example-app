import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import {
  type AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  type ValidationErrors,
  type ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, finalize } from 'rxjs';
import { emailValidator } from '~shared/validators/email.validator';
import { AUTH_URLS, USER_URLS } from '~core/constants/urls.constants';
import { passwordValidator } from '~shared/validators/password.validator';
import { SlInputIconFocusDirective } from '~shared/directives/sl-input-icon-focus.directive';
import { LowercaseDirective } from '~shared/directives/lowercase.directive';
import { TrimDirective } from '~shared/directives/trim.directive';
import type { ApiErrorResponse } from '~shared/types/api-response.types';
import { API_ERROR_CODES } from '~core/constants/api-error-codes.constants';
import { AlertService } from '~core/services/ui/alert.service';
import { LanguageService } from '~core/services/language.service';
import { AuthenticationService } from '../../services/authentication.service';
import type { User } from '~features/authentication/types/user.types';
import type {
  LogInFormGroup,
  LogInFormState,
} from '~features/authentication/pages/log-in/log-in-form.types';
import { translations } from '~locale/translations';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

@Component({
  selector: 'app-log-in',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    SlInputIconFocusDirective,
    NgOptimizedImage,
    LowercaseDirective,
    TrimDirective,
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LogInComponent {
  private readonly alertService = inject(AlertService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthenticationService);
  private readonly languageService = inject(LanguageService);
  private readonly destroyRef = inject(DestroyRef);

  readonly translations = translations;
  readonly authUrls = AUTH_URLS;
  readonly captchaChallenge = signal(this.createCaptchaChallenge());
  readonly captchaQuestion = computed(
    () => `${this.captchaChallenge().left} + ${this.captchaChallenge().right}`,
  );
  readonly logInForm = this.createLoginForm();
  readonly formControls = {
    email: this.logInForm.get('email') as FormControl<string>,
    password: this.logInForm.get('password') as FormControl<string>,
    captcha: this.logInForm.get('captcha') as FormControl<string>,
  };
  readonly formState = signal<LogInFormState>({
    isLoading: false,
    isSubmitted: false,
  });

  sendForm(): void {
    this.updateFormState({ isSubmitted: true });

    if (this.logInForm.invalid) {
      this.logInForm.markAllAsTouched();
      return;
    }

    this.updateFormState({ isLoading: true });
    this.authService
      .logIn(this.logInForm.getRawValue())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.updateFormState({ isLoading: false });
        }),
        catchError((error: ApiErrorResponse) => {
          this.handleLoginError(error);
          return EMPTY;
        }),
      )
      .subscribe({
        next: (user: User) => {
          this.languageService.navigateWithUserLanguage(user.language, USER_URLS.myPokemon);
        },
      });
  }

  private createLoginForm(): LogInFormGroup {
    return this.formBuilder.group({
      email: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(4), emailValidator()],
        nonNullable: true,
      }),
      password: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(6), passwordValidator()],
        nonNullable: true,
      }),
      captcha: new FormControl<string>('', {
        validators: [Validators.required, this.captchaValidator()],
        nonNullable: true,
      }),
    });
  }

  private handleLoginError(response: ApiErrorResponse): void {
    const errorMessage =
      response.error.internalCode === API_ERROR_CODES.INVALID_CREDENTIALS_CODE
        ? translations.loginCredentialsError
        : translations.genericErrorAlert;
    this.alertService.createErrorAlert(errorMessage);
    this.reloadCaptcha();
  }

  private updateFormState(updates: Partial<LogInFormState>): void {
    this.formState.update((state) => ({ ...state, ...updates }));
  }

  reloadCaptcha(): void {
    this.captchaChallenge.set(this.createCaptchaChallenge());
    this.formControls.captcha.reset('');
    this.formControls.captcha.updateValueAndValidity();
  }

  private captchaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = String(control.value ?? '').trim();
      if (!value) return null;
      return Number(value) === this.captchaChallenge().answer ? null : { captcha: true };
    };
  }

  private createCaptchaChallenge(): { left: number; right: number; answer: number } {
    const left = this.getRandomCaptchaNumber();
    const right = this.getRandomCaptchaNumber();
    return { left, right, answer: left + right };
  }

  private getRandomCaptchaNumber(): number {
    return Math.floor(Math.random() * 9) + 1;
  }
}
