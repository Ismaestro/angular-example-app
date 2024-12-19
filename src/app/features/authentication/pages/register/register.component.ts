import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AUTH_URLS, ROOT_URLS } from '~core/constants/urls.constants';
import { emailValidator } from '~core/validators/email.validator';
import { passwordValidator } from '~core/validators/password.validator';
import { PokemonValidator } from '~core/validators/pokemon.validator';
import { NgOptimizedImage } from '@angular/common';
import { SlInputIconFocusDirective } from '~core/directives/sl-input-icon-focus.directive';
import { translations } from '../../../../../locale/translations';
import { merge } from 'rxjs';
import { AppSlCheckboxControlDirective } from '~core/directives/sl-checkbox-control.directive';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import { AuthenticationService } from '~features/authentication/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    SlInputIconFocusDirective,
    AppSlCheckboxControlDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthenticationService);
  private readonly validatingPokemonValue = () => this.pokemonValidator.isPokemonValidating();

  pokemonValidator = inject(PokemonValidator);
  translations = translations;
  authUrls = AUTH_URLS;
  name = new FormControl('', [Validators.required, Validators.minLength(2)]);
  email = new FormControl('', [Validators.required, Validators.minLength(4), emailValidator()]);
  password = new FormControl('', {
    validators: [Validators.required, passwordValidator()],
    updateOn: 'change',
  });
  confirmPassword = new FormControl('', {
    validators: [Validators.required, passwordValidator()],
    updateOn: 'change',
  });
  favouritePokemon = new FormControl('', {
    validators: [Validators.required, Validators.minLength(2)],
    asyncValidators: [this.pokemonValidator.validate.bind(this.pokemonValidator)],
    updateOn: 'change',
  });
  terms = new FormControl(null, [Validators.requiredTrue]);
  registerForm = this.formBuilder.group({
    name: this.name,
    email: this.email,
    password: this.password,
    confirmPassword: this.confirmPassword,
    favouritePokemon: this.favouritePokemon,
    terms: this.terms,
  });
  isButtonRegisterLoading = false;
  confirmPasswordHelpText = '';
  isPokemonValidating = computed(this.validatingPokemonValue);

  ngOnInit() {
    this.favouritePokemon.setErrors({ pokemonName: true });
    // TODO: check all subscribes to unsubscribe
    merge(this.password.valueChanges, this.confirmPassword.valueChanges).subscribe(() => {
      this.checkPasswords();
    });
  }

  checkPasswords() {
    const areValuesEqual = this.password.value === this.confirmPassword.value;
    if (areValuesEqual && this.confirmPassword.getRawValue()) {
      this.confirmPasswordHelpText = '';
      this.confirmPassword.setErrors(null);
    } else {
      if (this.confirmPassword.touched) {
        this.confirmPasswordHelpText = translations.confirmPasswordHelpText;
      }
      this.confirmPassword.setErrors({ mismatch: true });
    }
  }

  sendForm() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      this.isButtonRegisterLoading = true;
      const formValue = this.registerForm.getRawValue();
      this.authService
        .register({
          email: formValue.email!,
          password: formValue.password!,
          name: formValue.name!,
          favouritePokemonId: this.pokemonValidator.getPokemonValue(),
          terms: formValue.terms!,
        })
        .subscribe({
          next: () => {
            void this.router.navigate([ROOT_URLS.myPokedex]);
          },
          error: () => {
            // TODO: implement alert
          },
        });
    }
  }
}
