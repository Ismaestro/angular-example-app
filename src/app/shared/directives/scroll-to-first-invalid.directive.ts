import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import UtilsHelper from '../../shared/helpers/utils.helper';

@Directive({selector: '[appScrollToFirstInvalid]'})
export class ScrollToFirstInvalidDirective {
  @Input() formGroup: NgForm;

  constructor(private el: ElementRef) {
  }

  @HostListener('submit', ['$event'])
  onSubmit(event) {
    event.preventDefault();

    if (!this.formGroup.valid) {
      const formControls = this.formGroup.controls;
      for (const control in formControls) {
        if (formControls.hasOwnProperty(control)) {
          formControls[control].markAsTouched();
        }
      }

      const target = this.el.nativeElement.querySelector('.ng-invalid');
      if (target) {
        UtilsHelper.scrollToElement(target);
      }
    }
  }
}
