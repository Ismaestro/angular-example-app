import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import {scrollToElement} from '../helpers/utils.helper';

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

      const formControlInvalid = this.el.nativeElement.querySelector('.form-control.ng-invalid');

      if (formControlInvalid) {
        return scrollToElement(formControlInvalid);
      } else {
        // The first element is the global form and here we are looking for the first nested form
        const formGroupInvalid = this.el.nativeElement.querySelectorAll('form.ng-invalid');
        if (formGroupInvalid && formGroupInvalid.length > 1) {
          return scrollToElement(formGroupInvalid[1]);
        }
      }

      return scrollToElement(this.el.nativeElement);
    }
  }
}
