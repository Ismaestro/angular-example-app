import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ScrollToFirstInvalidDirective} from './scroll-to-first-invalid.directive';
import {By} from '@angular/platform-browser';
import {TestsModule} from '../modules/tests.module';

@Component({
  template: `
    <form id="test-form" [formGroup]="testForm" appScrollToFirstInvalid>
      <input id="test-input" type="text" class="input" [formControl]="testForm.controls['someText']">
      <button id="test-button"
              form="test-form"
              (click)="saveForm()">
      </button>
    </form>
  `
})
class TestComponent {
  testForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.testForm = this.formBuilder.group({
      someText: ['', [Validators.required]]
    });
  }

  saveForm() {
  }
}

describe('ScrollToFirstInvalidDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [
        TestsModule
      ],
      declarations: [
        ScrollToFirstInvalidDirective,
        TestComponent
      ]
    }).createComponent(TestComponent);

    fixture.detectChanges();
  });

  it('should trigger focus on the input because scroll directive is executed', () => {
    const form = fixture.debugElement.queryAll(By.directive(ScrollToFirstInvalidDirective));
    const input = fixture.debugElement.query(By.css('input'));
    const button = fixture.debugElement.query(By.css('button'));

    expect(form).not.toBeNull();
    expect(input.nativeElement.classList.contains('ng-untouched')).toBe(true);

    button.nativeElement.click();
    fixture.detectChanges();

    expect(input.nativeElement.classList.contains('ng-touched')).toBe(true);
  });
});
