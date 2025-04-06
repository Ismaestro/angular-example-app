import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTrim]',
})
export class TrimDirective {
  private readonly el = inject(ElementRef);
  private readonly ngControl = inject(NgControl);

  @HostListener('blur') onBlur() {
    const { control } = this.ngControl;
    if (control) {
      control.setValue(this.el.nativeElement.value.trim());
    }
  }
}
