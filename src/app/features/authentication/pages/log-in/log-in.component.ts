import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormErrorsComponent } from '~core/components/form-errors/form-errors.component';
import { TrimDirective } from '~core/directives/trim.directive';
import { emailValidator } from '~core/validators/email.validator';
import { AUTH_URLS, USER_URLS } from '~core/consts/urls.consts';
import { LowercaseDirective } from '~core/directives/lowercase.directive';
import { passwordValidator } from '~core/validators/password.validator';
import { AuthenticationService } from '~features/authentication/services/authentication.service';

import '@shoelace-style/shoelace/dist/components/button/button.js';

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
    TrimDirective,
    LowercaseDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LogInComponent {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthenticationService);

  readonly authUrls = AUTH_URLS;
  readonly email = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(4),
    emailValidator(),
  ]);
  readonly password = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(6),
    passwordValidator(),
  ]);
  readonly logInForm = this.formBuilder.group({
    email: this.email,
    password: this.password,
  });

  isButtonLogInLoading = false;

  sendForm() {
    if (this.logInForm.valid) {
      this.isButtonLogInLoading = true;
      this.authService.logIn(this.logInForm.getRawValue());
      this.router.navigate([USER_URLS.dashboard]);
    }
  }
}
