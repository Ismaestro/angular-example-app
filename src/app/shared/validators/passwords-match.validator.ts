import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Cross-field validator: it belongs to the FormGroup, not to one of its controls, so it runs
 * whenever any of the two passwords changes and it never overwrites the errors of a control.
 */
export function passwordsMatchValidator(
  passwordControlName: string,
  confirmPasswordControlName: string,
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password: unknown = group.get(passwordControlName)?.value;
    const confirmPassword: unknown = group.get(confirmPasswordControlName)?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  };
}
