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
import { emailValidator } from '~core/validators/email.validator';
import { AUTH_URLS, ROOT_URLS } from '~core/constants/urls.constants';
import { passwordValidator } from '~core/validators/password.validator';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { SlInputIconFocusDirective } from '~core/directives/sl-input-icon-focus.directive';
import { translations } from '../../../../../locale/translations';
import { NgOptimizedImage } from '@angular/common';
import { AlertService } from '~core/services/ui/alert.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { User } from '~features/authentication/types/user.type';
import { LanguageService } from '~core/services/language.service';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { LowercaseDirective } from '~core/directives/lowercase.directive';
import { TrimDirective } from '~core/directives/trim.directive';

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

  readonly isButtonLogInLoading = signal(false);

  translations = translations;
  authUrls = AUTH_URLS;
  email = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(4),
    emailValidator(),
  ]);
  password = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(6),
    passwordValidator(),
  ]);
  logInForm = this.formBuilder.group({
    email: this.email,
    password: this.password,
  });

  sendForm() {
    this.logInForm.markAllAsTouched();
    if (this.logInForm.valid) {
      this.isButtonLogInLoading.set(true);
      const formValue = this.logInForm.getRawValue();
      this.authService
        .logIn({ email: formValue.email!, password: formValue.password! })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (user: User) => {
            this.isButtonLogInLoading.set(false);
            this.languageService.navigateWithUserLanguage(user.language, ROOT_URLS.myPokedex);
          },
          error: (response) => {
            this.isButtonLogInLoading.set(false);
            let errorMessage = translations.genericErrorAlert;
            if (response.error.internalCode === 2002) {
              errorMessage = translations.loginCredentialsError;
            }
            this.alertService.createErrorAlert(errorMessage);
          },
        });
    }
  }
}
