import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { beforeEach, describe, expect, it } from 'vitest';
import { LowercaseDirective } from './lowercase.directive';
import { TrimDirective } from './trim.directive';

@Component({
  selector: 'app-host',
  imports: [ReactiveFormsModule, LowercaseDirective, TrimDirective],
  template: '<input appLowercase appTrim [formControl]="email" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
  readonly email = new FormControl('', { nonNullable: true });
}

describe('LowercaseDirective and TrimDirective', () => {
  let host: HostComponent;
  let input: HTMLInputElement;

  const type = (value: string) => {
    input.value = value;
    input.dispatchEvent(new Event('input'));
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    host = fixture.componentInstance;
    input = (fixture.nativeElement as HTMLElement).querySelector('input')!;
  });

  it('should lowercase both the model and the view while typing', () => {
    type('Ash@Pallet.COM');

    expect(host.email.value).toBe('ash@pallet.com');
    expect(input.value).toBe('ash@pallet.com');
  });

  it('should trim both the model and the view on blur', () => {
    type('  ash@pallet.com  ');
    input.dispatchEvent(new Event('blur'));

    expect(host.email.value).toBe('ash@pallet.com');
    expect(input.value).toBe('ash@pallet.com');
  });
});
