import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appLowercase]',
  standalone: true,
})
export class LowercaseDirective {
  el = inject(ElementRef);
  ngControl = inject(NgControl);

  @HostListener('keydown') onKeyDown() {
    const control = this.ngControl.control;
    if (control) {
      control.setValue(this.el.nativeElement.value.toLowerCase());
    }
  }
}
