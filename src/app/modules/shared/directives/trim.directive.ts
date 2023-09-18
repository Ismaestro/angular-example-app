import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[trim]',
  standalone: true,
})
export class TrimDirective {
  constructor(
    private el: ElementRef,
    @Optional() private ngControl: NgControl,
  ) {}

  @HostListener('blur') onBlur() {
    const control = this.ngControl.control;
    if (control) {
      control.setValue(this.el.nativeElement.value.trim());
    }
  }
}
