import { Directive, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Lowercases the value of a form control while typing. It reads the value from the event
 * (not from the control), so it works no matter whether the value accessor has already
 * processed the same event or not.
 */
@Directive({
  selector: '[appLowercase]',
  host: {
    '(input)': 'toLowercase($event)',
  },
})
export class LowercaseDirective {
  private readonly ngControl = inject(NgControl);

  toLowercase(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    const lowercaseValue = value.toLowerCase();
    if (value !== lowercaseValue) {
      this.ngControl.control?.setValue(lowercaseValue);
    }
  }
}
