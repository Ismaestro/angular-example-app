import { Directive, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Trims the value of a form control when it loses the focus. It goes through the control
 * (not through the DOM element), so the model and the view stay in sync.
 */
@Directive({
  selector: '[appTrim]',
  host: {
    '(blur)': 'trimValue()',
  },
})
export class TrimDirective {
  private readonly ngControl = inject(NgControl);

  trimValue(): void {
    const { control } = this.ngControl;
    const value: unknown = control?.value;
    if (typeof value === 'string' && value !== value.trim()) {
      control?.setValue(value.trim());
    }
  }
}
