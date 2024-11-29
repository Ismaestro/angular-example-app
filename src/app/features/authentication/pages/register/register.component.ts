import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormErrorsComponent } from '~core/components/form-errors/form-errors.component';
import { TrimDirective } from '~core/directives/trim.directive';
import { AUTH_URLS } from '~core/consts/urls.consts';
import { LowercaseDirective } from '~core/directives/lowercase.directive';
import { emailValidator } from '~core/validators/email.validator';
import { passwordsMatchValidator, passwordValidator } from '~core/validators/password.validator';
import { PokemonValidator } from '~core/validators/pokemon.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormErrorsComponent,
    TrimDirective,
    LowercaseDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly pokemonValidator = inject(PokemonValidator);

  readonly authUrls = AUTH_URLS;
  readonly firstname = new FormControl('', [Validators.required, Validators.minLength(2)]);
  readonly email = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    emailValidator(),
  ]);
  readonly password = new FormControl('', {
    validators: [Validators.required, Validators.minLength(6), passwordValidator()],
    updateOn: 'change',
  });
  readonly repeatPassword = new FormControl('', {
    validators: [Validators.required, Validators.minLength(6), passwordValidator()],
    updateOn: 'change',
  });
  readonly favouritePokemon = new FormControl('', {
    validators: [Validators.required, Validators.minLength(2)],
    asyncValidators: [this.pokemonValidator.validate.bind(this.pokemonValidator)],
    updateOn: 'blur',
  });
  readonly terms = new FormControl(false, [Validators.requiredTrue]);
  readonly registerForm = this.formBuilder.group(
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

  isButtonRegisterLoading = false;
  showPassword = false;

  updatePassword() {
    this.password.updateValueAndValidity({ emitEvent: false });
  }

  sendForm() {
    this.terms.markAsTouched();
    this.terms.updateValueAndValidity();
    if (this.registerForm.valid) {
      this.isButtonRegisterLoading = true;
    }
  }

  togglePasswordType() {
    this.showPassword = !this.showPassword;
  }
}
