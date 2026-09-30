import { FormControl, FormGroup } from '@angular/forms';
import { describe, expect, it } from 'vitest';
import { passwordsMatchValidator } from './passwords-match.validator';

describe('passwordsMatchValidator', () => {
  const createForm = (password: string, confirmPassword: string) =>
    new FormGroup(
      { password: new FormControl(password), confirmPassword: new FormControl(confirmPassword) },
      { validators: [passwordsMatchValidator('password', 'confirmPassword')] },
    );

  it('should be valid when both passwords match', () => {
    expect(createForm('Pikachu123', 'Pikachu123').errors).toBeNull();
  });

  it('should add the error to the group, without touching the errors of the controls', () => {
    const form = createForm('Pikachu123', 'Raichu123');

    expect(form.errors).toEqual({ passwordsMismatch: true });
    expect(form.controls.confirmPassword.errors).toBeNull();
  });

  it('should be re-evaluated when any of the passwords changes', () => {
    const form = createForm('Pikachu123', 'Raichu123');

    form.controls.password.setValue('Raichu123');

    expect(form.errors).toBeNull();
  });
});
