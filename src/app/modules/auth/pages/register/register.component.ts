import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormErrorsComponent } from '~modules/shared/components/form-errors/form-errors.component';
import { LanguageSelectorComponent } from '~modules/auth/shared/components/language-selector/language-selector.component';
import { TrimDirective } from '~modules/shared/directives/trim.directive';
import { AUTH_URLS } from '~modules/shared/consts/urls.consts';
import { LowercaseDirective } from '~modules/shared/directives/lowercase.directive';
import { emailValidator } from '~modules/shared/validators/email.validator';
import {
  passwordsMatchValidator,
  passwordValidator,
} from '~modules/shared/validators/password.validator';
import { PokemonValidator } from '~modules/shared/validators/pokemon.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormErrorsComponent,
    LanguageSelectorComponent,
    TrimDirective,
    LowercaseDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterComponent {
  formBuilder = inject(FormBuilder);
  pokemonValidator = inject(PokemonValidator);
  authUrls = AUTH_URLS;
  isButtonRegisterLoading = false;
  showPassword = false;
  firstname = new FormControl('', [Validators.required, Validators.minLength(2)]);
  email = new FormControl('', [Validators.required, Validators.minLength(4), emailValidator()]);
  password = new FormControl('', {
    validators: [Validators.required, Validators.minLength(6), passwordValidator()],
    updateOn: 'change',
  });
  repeatPassword = new FormControl('', {
    validators: [Validators.required, Validators.minLength(6), passwordValidator()],
    updateOn: 'change',
  });
  favouritePokemon = new FormControl('', {
    validators: [Validators.required, Validators.minLength(2)],
    asyncValidators: [this.pokemonValidator.validate.bind(this.pokemonValidator)],
    updateOn: 'blur',
  });
  terms = new FormControl(false, [Validators.requiredTrue]);
  registerForm = this.formBuilder.group(
    {
      firstname: this.firstname,
      email: this.email,
      password: this.password,
      repeatPassword: this.repeatPassword,
      favouritePokemon: this.favouritePokemon,
      terms: this.terms,
    },
    { validators: passwordsMatchValidator },
  );

  updatePassword() {
    this.password.updateValueAndValidity({ emitEvent: false });
  }

  sendForm() {
    this.terms.markAsTouched();
    this.terms.updateValueAndValidity();
    if (this.registerForm.valid) {
      this.isButtonRegisterLoading = true;
      console.log(this.registerForm.getRawValue());
    }
  }

  togglePasswordType() {
    this.showPassword = !this.showPassword;
  }
}
