import type { FormControl, FormGroup } from '@angular/forms';
import type { WritableSignal } from '@angular/core';

export type RegisterFormGroup = FormGroup<{
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  favouritePokemonId: FormControl<string>;
  terms: FormControl<boolean | null>;
}>;

export type RegisterFormValue = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  favouritePokemonId: number;
  terms: boolean;
};

export type RegisterFormState = {
  isLoading: boolean;
  isSubmitted: boolean;
  isRegistrationCompleted: boolean;
  passwordsMatch: boolean;
  isPokemonValidating: WritableSignal<boolean>;
};
