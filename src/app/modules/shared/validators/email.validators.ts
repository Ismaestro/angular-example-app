import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEmail as isEmailValidator } from 'class-validator';

export class EmailValidators {
  static isEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !isEmailValidator(control.value) ? { email: true } : null;
    };
  }
}
