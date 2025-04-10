import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, finalize } from 'rxjs';
import { emailValidator } from '~core/validators/email.validator';
import { AUTH_URLS, ROOT_URLS } from '~core/constants/urls.constants';
import { passwordValidator } from '~core/validators/password.validator';
import { SlInputIconFocusDirective } from '~core/directives/sl-input-icon-focus.directive';
import { LowercaseDirective } from '~core/directives/lowercase.directive';
import { TrimDirective } from '~core/directives/trim.directive';
import type { ApiErrorResponse } from '~core/types/api-response.types';
import { API_ERROR_CODES } from '~core/constants/api-error-codes.constants';
import { AlertService } from '~core/services/ui/alert.service';
import { LanguageService } from '~core/services/language.service';
import { AuthenticationService } from '../../services/authentication.service';
import type { User } from '~features/authentication/types/user.type';
import type {
  FormState,
  LoginForm,
  LoginFormControl,
  LoginFormGroup,
} from '~features/authentication/pages/log-in/log-in-form.types';
import { translations } from '../../../../../locale/translations';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    SlInputIconFocusDirective,
    NgOptimizedImage,
    LowercaseDirective,
    TrimDirective,
  ],
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

  readonly formState = signal<FormState>({
    isLoading: false,
    isSubmitted: false,
    emailError: '',
    passwordError: '',
  });

  readonly logInForm = this.createLoginForm();

  readonly emailError = computed<string>(() =>
    this.shouldShowFieldError(this.email) ? translations.emailHelpText : '',
  );

  readonly passwordError = computed<string>(() =>
    this.shouldShowFieldError(this.password) ? translations.passwordHelpText : '',
  );

  get email(): LoginFormControl {
    return this.logInForm.get('email') as LoginFormControl;
  }

  get password(): LoginFormControl {
    return this.logInForm.get('password') as LoginFormControl;
  }

  sendForm(): void {
    this.updateFormState({ isSubmitted: true });

    if (this.logInForm.invalid) {
      this.logInForm.markAllAsTouched();
      return;
    }

    this.updateFormState({ isLoading: true });
    const formValue = this.logInForm.getRawValue() as LoginForm;

    this.authService
      .logIn(formValue)
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
          this.languageService.navigateWithUserLanguage(user.language, ROOT_URLS.myPokedex);
        },
      });
  }

  private createLoginForm(): LoginFormGroup {
    return this.formBuilder.group({
      email: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(4), emailValidator()],
        nonNullable: true,
      }),
      password: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(6), passwordValidator()],
        nonNullable: true,
      }),
    });
  }

  private shouldShowFieldError(control: LoginFormControl): boolean {
    return this.formState().isSubmitted && control.invalid;
  }

  private handleLoginError(response: ApiErrorResponse): void {
    const errorMessage =
      response.error.internalCode === API_ERROR_CODES.INVALID_CREDENTIALS_CODE
        ? translations.loginCredentialsError
        : translations.genericErrorAlert;
    this.alertService.createErrorAlert(errorMessage);
  }

  private updateFormState(updates: Partial<FormState>): void {
    this.formState.update((state) => ({ ...state, ...updates }));
  }
}
