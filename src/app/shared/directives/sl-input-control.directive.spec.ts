import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import type { SlInput } from '@shoelace-style/shoelace';
import { beforeEach, describe, expect, it } from 'vitest';
import { AppSlInputControlDirective } from './sl-input-control.directive';

@Component({
  selector: 'app-host',
  imports: [FormField, AppSlInputControlDirective],
  template: '<sl-input appSlInputControl lowercase trim [formField]="emailForm.email" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
class HostComponent {
  readonly model = signal({ email: '' });
  readonly emailForm = form(this.model);
}

describe('AppSlInputControlDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let input: SlInput;

  const type = (value: string) => {
    input.value = value;
    input.dispatchEvent(new Event('sl-input'));
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    host = fixture.componentInstance;
    input = (fixture.nativeElement as HTMLElement).querySelector<SlInput>('sl-input')!;
  });

  it('should write the model into the element', async () => {
    host.model.set({ email: 'ash@pallet.com' });
    await fixture.whenStable();

    expect(input.value).toBe('ash@pallet.com');
  });

  it('should lowercase both the model and the view while typing', () => {
    type('Ash@Pallet.COM');

    expect(host.model().email).toBe('ash@pallet.com');
    expect(input.value).toBe('ash@pallet.com');
  });

  it('should trim both the model and the view on blur and mark the field as touched', () => {
    type('  ash@pallet.com  ');
    input.dispatchEvent(new Event('sl-blur'));

    expect(host.model().email).toBe('ash@pallet.com');
    expect(input.value).toBe('ash@pallet.com');
    expect(host.emailForm.email().touched()).toBe(true);
  });
});
