import type { FormControl, FormGroup } from '@angular/forms';

export type LogInFormGroup = FormGroup<{
  email: FormControl<string>;
  password: FormControl<string>;
}>;

export type LogInFormState = {
  isLoading: boolean;
  isSubmitted: boolean;
};
