import type { SchemaPath } from '@angular/forms/signals';
import { validate } from '@angular/forms/signals';

const MIN_PASSWORD_LENGTH = 8;

/** Empty values are valid: combine it with `required()` to make the field mandatory */
export function validatePasswordStrength(path: SchemaPath<string>): void {
  validate(path, ({ value }) => {
    const password = value();
    return !password || isStrongPassword(password) ? null : { kind: 'passwordStrength' };
  });
}

function isStrongPassword(value: string) {
  const hasUppercase = /[A-Z]/u.test(value);
  const hasLowercase = /[a-z]/u.test(value);
  const hasNumber = /\d/u.test(value);
  const hasMinLength = value.length >= MIN_PASSWORD_LENGTH;
  return hasUppercase && hasLowercase && hasNumber && hasMinLength;
}
