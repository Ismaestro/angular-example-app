import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appLowercase]',
  standalone: true,
})
export class LowercaseDirective {
  private readonly el = inject(ElementRef);
  private readonly ngControl = inject(NgControl);

  @HostListener('keydown') onKeyDown() {
    const { control } = this.ngControl;
    if (control) {
      control.setValue(this.el.nativeElement.value.toLowerCase());
    }
  }
}
