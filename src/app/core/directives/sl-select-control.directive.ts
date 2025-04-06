import { Directive, ElementRef, inject, model } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appSlSelectControl]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AppSlSelectControlDirective,
      multi: true,
    },
  ],
  host: {
    '[attr.value]': 'value()',
    '(sl-change)': 'onSlChange()',
  },
})
export class AppSlSelectControlDirective implements ControlValueAccessor {
  private readonly el = inject(ElementRef);

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  private onChangeFn = (value: unknown) => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouchedFn = () => {};

  readonly value = model('');

  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(function_: () => void): void {
    this.onChangeFn = function_;
  }

  registerOnTouched(function_: () => void): void {
    this.onTouchedFn = function_;
  }

  onSlChange(): void {
    const { value } = this.el.nativeElement;
    this.onChangeFn(value);
    this.onTouchedFn();
  }
}
