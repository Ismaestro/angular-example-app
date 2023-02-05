import { TrimDirective } from '~modules/shared/directives/trim.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="form"><input id="test-input" type="text" trim [formControl]="input" /></form>
  `,
})
class HostComponent {
  input = new FormControl(' patata ');
  form = new FormGroup({
    input: this.input,
  });
}

describe('TrimDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrimDirective, ReactiveFormsModule],
      declarations: [HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
  });

  it('should trim spaces', () => {
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('#test-input')).nativeElement;
    expect(input.value).toBe(' patata ');
    input.dispatchEvent(new InputEvent('blur'));
    expect(input.value).toBe('patata');
  });
});
