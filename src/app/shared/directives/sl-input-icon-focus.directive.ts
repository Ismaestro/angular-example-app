import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appSlInputIconFocus]',
  host: {
    '(mouseover)': 'onMouseOver()',
    '(mouseout)': 'onMouseOut()',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
  },
})
export class SlInputIconFocusDirective {
  private readonly el = inject(ElementRef);

  private isFocused = false;

  onMouseOver() {
    this.el.nativeElement.querySelector('sl-icon').style.color = 'var(--primary-contrast)';
  }

  onMouseOut() {
    if (!this.isFocused) {
      this.el.nativeElement.querySelector('sl-icon').style.color = 'var(--quaternary-contrast)';
    }
  }

  onFocus() {
    this.isFocused = true;
    this.el.nativeElement.querySelector('sl-icon').style.color = 'var(--primary-contrast)';
  }

  onBlur() {
    this.isFocused = false;
    this.el.nativeElement.querySelector('sl-icon').style.color = 'var(--quaternary-contrast)';
  }
}
