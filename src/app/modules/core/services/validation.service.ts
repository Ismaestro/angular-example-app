import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { contains, isEmail } from 'class-validator';
import { environment } from '~environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  static isEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValidEmail =
        isEmail(control.value) &&
        ((environment.production && !contains(control.value, '+')) || !environment.production);
      return !isValidEmail ? { email: true } : null;
    };
  }
}
