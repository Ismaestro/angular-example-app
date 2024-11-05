import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorsComponent implements OnInit {
  changeDetectorRef = inject(ChangeDetectorRef);

  control = input<FormControl>(new FormControl<unknown>(''));

  ngOnInit() {
    this.control().statusChanges.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }
}
