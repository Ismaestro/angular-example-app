import { Directive, ElementRef, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appLowercase]',
  host: {
    '(keydown)': 'onKeyDown()',
  },
})
export class LowercaseDirective {
  private readonly el = inject(ElementRef);
  private readonly ngControl = inject(NgControl);

  onKeyDown() {
    const { control } = this.ngControl;
    if (control) {
      control.setValue(this.el.nativeElement.value.toLowerCase());
    }
  }
}
