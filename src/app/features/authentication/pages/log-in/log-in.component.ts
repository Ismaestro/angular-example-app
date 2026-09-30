import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import type { User } from '~features/authentication/types/user.types';
import { translations } from '~locale/translations';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

@Component({
  selector: 'app-log-in',
  imports: [
    ReactiveFormsModule,
    RouterLink,
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
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthenticationService);
  private readonly languageService = inject(LanguageService);
  private readonly destroyRef = inject(DestroyRef);

  readonly translations = translations;
  readonly authUrls = AUTH_URLS;
  readonly isLoading = signal(false);
  readonly logInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.minLength(4), emailValidator()]],
    password: ['', [Validators.required, Validators.minLength(6), passwordValidator()]],
  });
  readonly controls = this.logInForm.controls;

  sendForm(): void {
    if (this.logInForm.invalid) {
      this.logInForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.authService
      .logIn(this.logInForm.getRawValue())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoading.set(false);
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

  private handleLoginError(response: ApiErrorResponse): void {
    const errorMessage =
      response.error.internalCode === API_ERROR_CODES.INVALID_CREDENTIALS_CODE
        ? translations.loginCredentialsError
        : translations.genericErrorAlert;
    this.alertService.createErrorAlert(errorMessage);
  }
}
