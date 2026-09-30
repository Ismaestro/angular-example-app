import { Directive, ElementRef, forwardRef, inject, Renderer2 } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { SlSelect } from '@shoelace-style/shoelace';

/** Connects a Shoelace select (a web component) to Angular forms */
@Directive({
  selector: '[appSlSelectControl]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // The class is referenced inside its own decorator, before being declared
      // eslint-disable-next-line @angular-eslint/no-forward-ref
      useExisting: forwardRef(() => AppSlSelectControlDirective),
      multi: true,
    },
  ],
  host: {
    '(sl-change)': 'onSlChange()',
    '(sl-blur)': 'onTouched()',
  },
})
export class AppSlSelectControlDirective implements ControlValueAccessor {
  private readonly renderer = inject(Renderer2);
  private readonly element = inject<ElementRef<SlSelect>>(ElementRef);
  private onChange: (value: string) => void = () => undefined;

  onTouched: () => void = () => undefined;

  writeValue(value: string | null): void {
    // Same approach as the built-in value accessors of Angular
    this.renderer.setProperty(this.element.nativeElement, 'value', value ?? '');
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.element.nativeElement, 'disabled', isDisabled);
  }

  onSlChange(): void {
    const value = String(this.element.nativeElement.value);
    this.onChange(value);
    this.onTouched();
  }
}
