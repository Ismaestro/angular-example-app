import { Directive, ElementRef, forwardRef, inject, Renderer2 } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { SlCheckbox } from '@shoelace-style/shoelace';

/** Connects a Shoelace checkbox (a web component) to Angular forms */
@Directive({
  selector: '[appSlCheckboxControl]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // The class is referenced inside its own decorator, before being declared
      // eslint-disable-next-line @angular-eslint/no-forward-ref
      useExisting: forwardRef(() => AppSlCheckboxControlDirective),
      multi: true,
    },
  ],
  host: {
    '(sl-change)': 'onSlChange()',
    '(sl-blur)': 'onTouched()',
  },
})
export class AppSlCheckboxControlDirective implements ControlValueAccessor {
  private readonly renderer = inject(Renderer2);
  private readonly element = inject<ElementRef<SlCheckbox>>(ElementRef);
  private onChange: (checked: boolean) => void = () => undefined;

  onTouched: () => void = () => undefined;

  writeValue(checked: boolean | null): void {
    // Same approach as the built-in value accessors of Angular
    this.renderer.setProperty(this.element.nativeElement, 'checked', checked ?? false);
  }

  registerOnChange(onChange: (checked: boolean) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.element.nativeElement, 'disabled', isDisabled);
  }

  onSlChange(): void {
    const { checked } = this.element.nativeElement;
    this.onChange(checked);
    this.onTouched();
  }
}
