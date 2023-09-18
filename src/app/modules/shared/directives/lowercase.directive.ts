import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[lowercase]',
  standalone: true,
})
export class LowercaseDirective {
  constructor(
    private el: ElementRef,
    @Optional() private ngControl: NgControl,
  ) {}

  @HostListener('keydown') onKeyDown() {
    const control = this.ngControl.control;
    if (control) {
      control.setValue(this.el.nativeElement.value.toLowerCase());
    }
  }
}
