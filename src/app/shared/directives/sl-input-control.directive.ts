import {
  booleanAttribute,
  Directive,
  ElementRef,
  forwardRef,
  inject,
  input,
  Renderer2,
} from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { SlInput } from '@shoelace-style/shoelace';

/**
 * Connects a Shoelace input (a web component) to a signal forms field (`[formField]`).
 * It can also normalize what the user types: `lowercase` while typing and `trim` on blur.
 * The normalized value is what reaches the model, and it is written back to the element.
 */
@Directive({
  selector: 'sl-input[appSlInputControl]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // The class is referenced inside its own decorator, before being declared
      // eslint-disable-next-line @angular-eslint/no-forward-ref
      useExisting: forwardRef(() => AppSlInputControlDirective),
      multi: true,
    },
  ],
  host: {
    '(sl-input)': 'onSlInput()',
    '(sl-blur)': 'onSlBlur()',
  },
})
export class AppSlInputControlDirective implements ControlValueAccessor {
  private readonly renderer = inject(Renderer2);
  private readonly element = inject<ElementRef<SlInput>>(ElementRef);
  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  readonly lowercase = input(false, { transform: booleanAttribute });
  readonly trim = input(false, { transform: booleanAttribute });

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

  onSlInput(): void {
    const { value } = this.element.nativeElement;
    this.emit(this.lowercase() ? value.toLowerCase() : value);
  }

  onSlBlur(): void {
    if (this.trim()) {
      this.emit(this.element.nativeElement.value.trim());
    }
    this.onTouched();
  }

  private emit(value: string): void {
    if (value !== this.element.nativeElement.value) {
      this.writeValue(value);
    }
    this.onChange(value);
  }
}
