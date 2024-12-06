import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  const validators = [
    (value: string) => /[A-Z]/u.test(value), // Has uppercase
    (value: string) => /[a-z]/u.test(value), // Has lowercase
    (value: string) => /[0-9]/u.test(value), // Has numeric
    (value: string) => value.length >= 8, // Is valid length
  ];

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value) {
      return null;
    }
    return validators.every((function_) => function_(value)) ? null : { passwordStrength: true };
  };
}
