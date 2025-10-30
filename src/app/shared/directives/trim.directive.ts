import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appTrim]',
  host: {
    '(blur)': 'onBlur()',
  },
})
export class TrimDirective {
  private readonly el = inject(ElementRef);

  onBlur() {
    this.el.nativeElement.value = this.el.nativeElement.value.trim();
  }
}
