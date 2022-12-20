import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorsComponent implements DoCheck {
  @Input() formRef: FormGroupDirective | undefined;
  @Input() control: FormControl | undefined;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngDoCheck() {
    this.changeDetectorRef.markForCheck();
  }
}
