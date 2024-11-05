import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormErrorsComponent } from '~modules/shared/components/form-errors/form-errors.component';
import { LanguageSelectorComponent } from '~modules/auth/shared/components/language-selector/language-selector.component';
import { TrimDirective } from '~modules/shared/directives/trim.directive';
import { emailValidator } from '~modules/shared/validators/email.validator';
import { AUTH_URLS, USER_URLS } from '~modules/shared/consts/urls.consts';
import { AuthService } from '~modules/auth/shared/auth.service';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import { LowercaseDirective } from '~modules/shared/directives/lowercase.directive';
import { passwordValidator } from '~modules/shared/validators/password.validator';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FormErrorsComponent,
    LanguageSelectorComponent,
    TrimDirective,
    LowercaseDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LogInComponent {
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);

  authUrls = AUTH_URLS;
  isButtonLogInLoading = false;
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
    if (this.logInForm.valid) {
      this.isButtonLogInLoading = true;
      this.authService.logIn(this.logInForm.getRawValue());
      this.router.navigate([USER_URLS.dashboard]);
    }
  }
}
