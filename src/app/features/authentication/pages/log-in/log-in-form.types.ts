import type { FormControl, FormGroup } from '@angular/forms';

export type LogInFormState = {
  isLoading: boolean;
  isSubmitted: boolean;
  emailError: string;
  passwordError: string;
};

export type LogInForm = {
  email: string;
  password: string;
};

export type LogInFormGroup = FormGroup<{
  email: FormControl<string>;
  password: FormControl<string>;
}>;

export type LogInFormControl = FormControl<string>;
