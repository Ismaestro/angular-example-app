import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[tohHighlight]'
})
export class HighlightDirective {

  @Input() tohHighlight: string;

  @Input() defaultColor: string;

  constructor(private el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.tohHighlight || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
