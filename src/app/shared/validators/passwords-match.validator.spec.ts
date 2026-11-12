import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form } from '@angular/forms/signals';
import { describe, expect, it } from 'vitest';
import { validatePasswordsMatch } from './passwords-match.validator';

describe('validatePasswordsMatch', () => {
  const createForm = (password: string, confirmPassword: string) => {
    const model = signal({ password, confirmPassword });
    const passwordsForm = TestBed.runInInjectionContext(() =>
      form(model, (path) => {
        validatePasswordsMatch(path.confirmPassword, path.password);
      }),
    );
    return { model, passwordsForm };
  };

  it('should be valid when both passwords match', () => {
    const { passwordsForm } = createForm('Pikachu123', 'Pikachu123');

    expect(passwordsForm().valid()).toBe(true);
  });

  it('should add the error to the confirmation field only', () => {
    const { passwordsForm } = createForm('Pikachu123', 'Raichu123');

    expect(passwordsForm.confirmPassword().errors()).toEqual([
      expect.objectContaining({ kind: 'passwordsMismatch' }),
    ]);
    expect(passwordsForm.password().errors()).toEqual([]);
  });

  it('should be re-evaluated when any of the passwords changes', () => {
    const { model, passwordsForm } = createForm('Pikachu123', 'Raichu123');

    model.update((value) => ({ ...value, password: 'Raichu123' }));

    expect(passwordsForm().valid()).toBe(true);
  });
});
