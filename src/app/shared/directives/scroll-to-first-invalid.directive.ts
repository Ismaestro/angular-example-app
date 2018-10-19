import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UtilsHelperService} from '../../core/services/utils-helper.service';

@Directive({selector: '[appScrollToFirstInvalid]'})
export class ScrollToFirstInvalidDirective {
  @Input() formGroup: NgForm;

  constructor(private el: ElementRef) {
  }

  @HostListener('submit', ['$event'])
  onSubmit(event) {
    event.preventDefault();

    if (!this.formGroup.valid) {
      UtilsHelperService.markFormGroupTouched(this.formGroup);

      const formControlInvalid = this.el.nativeElement.querySelector('.form-control.ng-invalid');

      if (formControlInvalid) {
        return UtilsHelperService.scrollToElement(formControlInvalid);
      } else {
        // The first element is the global form and here we are looking for the first nested form
        const formGroupInvalid = this.el.nativeElement.querySelectorAll('.form.ng-invalid');
        if (formGroupInvalid && formGroupInvalid.length) {
          return UtilsHelperService.scrollToElement(formGroupInvalid[0]);
        }
      }

      return UtilsHelperService.scrollToElement(this.el.nativeElement);
    }
  }
}
