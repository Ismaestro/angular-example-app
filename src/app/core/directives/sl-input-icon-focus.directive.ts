import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appSlInputIconFocus]',
  standalone: true,
})
export class SlInputIconFocusDirective {
  private readonly el = inject(ElementRef);

  private isFocused = false;

  @HostListener('mouseover')
  onMouseOver() {
    this.el.nativeElement.querySelector('sl-icon').style.color = 'var(--primary-contrast)';
  }

  @HostListener('mouseout')
  onMouseOut() {
    if (!this.isFocused) {
      this.el.nativeElement.querySelector('sl-icon').style.color = 'var(--quaternary-contrast)';
    }
  }

  @HostListener('focus') onFocus() {
    this.isFocused = true;
    this.el.nativeElement.querySelector('sl-icon').style.color = 'var(--primary-contrast)';
  }

  @HostListener('blur') onBlur() {
    this.isFocused = false;
    this.el.nativeElement.querySelector('sl-icon').style.color = 'var(--quaternary-contrast)';
  }
}
