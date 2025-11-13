import { Directive, effect, inject, signal } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTrim]',
  host: {
    '(blur)': 'onBlur()',
  },
})
export class TrimDirective {
  private readonly ngControl = inject(NgControl);
  private readonly trimmedValue = signal('');

  constructor() {
    effect(() => {
      const { control } = this.ngControl;
      if (control && this.trimmedValue()) {
        control.setValue(this.trimmedValue(), { emitEvent: false });
      }
    });
  }

  onBlur() {
    const { control } = this.ngControl;
    if (control) {
      const updatedValue = (control.value ?? '').toString().trim();
      this.trimmedValue.set(updatedValue);
    }
  }
}
