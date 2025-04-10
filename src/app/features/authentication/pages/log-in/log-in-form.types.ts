import type { FormControl, FormGroup } from '@angular/forms';

export type FormState = {
  isLoading: boolean;
  isSubmitted: boolean;
  emailError: string;
  passwordError: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type LoginFormGroup = FormGroup<{
  email: FormControl<string>;
  password: FormControl<string>;
}>;

export type LoginFormControl = FormControl<string>;
