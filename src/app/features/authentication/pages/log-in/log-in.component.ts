import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import { form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { validateEmail } from '~shared/validators/email.validator';
import { AUTH_URLS, USER_URLS } from '~core/constants/urls.constants';
import { validatePasswordStrength } from '~shared/validators/password.validator';
import { SlInputIconFocusDirective } from '~shared/directives/sl-input-icon-focus.directive';
import { AppSlInputControlDirective } from '~shared/directives/sl-input-control.directive';
import type { ApiErrorResponse } from '~shared/types/api-response.types';
import { API_ERROR_CODES } from '~core/constants/api-error-codes.constants';
import { AlertService } from '~core/services/ui/alert.service';
import { LanguageService } from '~core/services/language.service';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import type { LoginRequest } from '~features/authentication/types/login-request.types';
import { translations } from '~locale/translations';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

@Component({
  selector: 'app-log-in',
  imports: [
    FormField,
    FormRoot,
    RouterLink,
    SlInputIconFocusDirective,
    AppSlInputControlDirective,
    NgOptimizedImage,
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LogInComponent {
  private readonly alertService = inject(AlertService);
  private readonly authService = inject(AuthenticationService);
  private readonly languageService = inject(LanguageService);

  readonly translations = translations;
  readonly authUrls = AUTH_URLS;

  private readonly logInModel = signal<LoginRequest>({ email: '', password: '' });
  readonly logInForm = form(
    this.logInModel,
    (path) => {
      required(path.email);
      minLength(path.email, 4);
      validateEmail(path.email);
      required(path.password);
      minLength(path.password, 6);
      validatePasswordStrength(path.password);
    },
    // Only runs when the form is valid. `[formRoot]` calls it on submit
    { submission: { action: async () => this.logIn() } },
  );
  readonly isLoading = this.logInForm().submitting;

  private async logIn(): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.logIn(this.logInModel()));
      this.languageService.navigateWithUserLanguage(user.language, USER_URLS.myPokemon);
    } catch (error) {
      this.handleLoginError(error as ApiErrorResponse);
    }
  }

  private handleLoginError(response: ApiErrorResponse): void {
    const errorMessage =
      response.error.internalCode === API_ERROR_CODES.INVALID_CREDENTIALS_CODE
        ? translations.loginCredentialsError
        : translations.genericErrorAlert;
    this.alertService.createErrorAlert(errorMessage);
  }
}
