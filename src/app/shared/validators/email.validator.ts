import type { SchemaPath } from '@angular/forms/signals';
import { validate } from '@angular/forms/signals';

const EMAIL_REGEX = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/u;

/** Empty values are valid: combine it with `required()` to make the field mandatory */
export function validateEmail(path: SchemaPath<string>): void {
  validate(path, ({ value }) => {
    const email = value();
    return !email || EMAIL_REGEX.test(email) ? null : { kind: 'email' };
  });
}
