import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value ?? '') as string;
    if (!value) return null;
    const isValid = isStrongPassword(value);
    return isValid ? null : { passwordStrength: true };
  };
}

function isStrongPassword(value: string) {
  const hasUppercase = /[A-Z]/u.test(value);
  const hasLowercase = /[a-z]/u.test(value);
  const hasNumber = /\d/u.test(value);
  const hasMinLength = value.length >= 8;
  return hasUppercase && hasLowercase && hasNumber && hasMinLength;
}
