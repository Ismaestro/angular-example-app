import {
  ChangeDetectionStrategy,
  Component,
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
import { AlertStore } from '~core/services/ui/alert.store';
import { LanguageService } from '~core/services/language.service';
import { AuthenticationService } from '../../services/authentication.service';
import type { User } from '~features/authentication/types/user.type';
import type {
  LogInFormGroup,
  LogInFormState,
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
  private readonly alertStore = inject(AlertStore);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthenticationService);
  private readonly languageService = inject(LanguageService);
  private readonly destroyRef = inject(DestroyRef);

  readonly translations = translations;
  readonly authUrls = AUTH_URLS;
  readonly logInForm = this.createLoginForm();
  readonly formControls = {
    email: this.logInForm.get('email') as FormControl<string>,
    password: this.logInForm.get('password') as FormControl<string>,
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
          this.languageService.navigateWithUserLanguage(user.language, ROOT_URLS.myPokedex);
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
    });
  }

  private handleLoginError(response: ApiErrorResponse): void {
    const errorMessage =
      response.error.internalCode === API_ERROR_CODES.INVALID_CREDENTIALS_CODE
        ? translations.loginCredentialsError
        : translations.genericErrorAlert;
    this.alertStore.createErrorAlert(errorMessage);
  }

  private updateFormState(updates: Partial<LogInFormState>): void {
    this.formState.update((state) => ({ ...state, ...updates }));
  }
}
