import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEmail } from 'class-validator';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  static isEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !isEmail(control.value) ? { email: true } : null;
    };
  }
}
