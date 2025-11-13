import { Directive, effect, inject, signal } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appLowercase]',
  host: {
    '(input)': 'onInput()',
  },
})
export class LowercaseDirective {
  private readonly ngControl = inject(NgControl);
  private readonly value = signal('');

  constructor() {
    effect(() => {
      const { control } = this.ngControl;
      if (control && this.value()) {
        control.setValue(this.value(), { emitEvent: false });
      }
    });
  }

  onInput() {
    const { control } = this.ngControl;
    if (control) {
      const updatedValue = (control.value ?? '').toString().toLowerCase();
      this.value.set(updatedValue);
    }
  }
}
