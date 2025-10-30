import { Directive, ElementRef, inject, model } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appSlCheckboxControl]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AppSlCheckboxControlDirective,
      multi: true,
    },
  ],
  host: {
    '[attr.checked]': 'checked()',
    '(sl-change)': 'onSlChange()',
  },
})
export class AppSlCheckboxControlDirective implements ControlValueAccessor {
  private readonly el = inject(ElementRef);

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  private onChangeFn = (value: boolean) => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouchedFn = () => {};

  readonly checked = model(false);

  writeValue(value: boolean): void {
    this.checked.set(value);
  }

  registerOnChange(function_: () => void): void {
    this.onChangeFn = function_;
  }

  registerOnTouched(function_: () => void): void {
    this.onTouchedFn = function_;
  }

  onSlChange(): void {
    const { checked } = this.el.nativeElement;
    this.onChangeFn(checked);
    this.onTouchedFn();
  }
}
