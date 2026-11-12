import type { SchemaPath } from '@angular/forms/signals';
import { validate } from '@angular/forms/signals';

/**
 * Cross-field validator: the error is reported on the confirmation field. `valueOf` reads the
 * other password reactively, so it is re-evaluated whenever any of the two passwords changes.
 */
export function validatePasswordsMatch(
  confirmPasswordPath: SchemaPath<string>,
  passwordPath: SchemaPath<string>,
): void {
  validate(confirmPasswordPath, ({ value, valueOf }) =>
    value() === valueOf(passwordPath) ? null : { kind: 'passwordsMismatch' },
  );
}
