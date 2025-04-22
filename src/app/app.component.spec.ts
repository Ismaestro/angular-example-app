import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
  Component,
  provideExperimentalZonelessChangeDetection,
  ChangeDetectionStrategy,
} from '@angular/core';
import { HeaderService } from '~core/services/ui/header.service';
import { ENVIRONMENT } from '~core/tokens/environment.token';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { HeaderComponent } from '~core/components/header/header.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  template: '',
})
class HeaderStubComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let setCanonicalSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ENVIRONMENT, useValue: { domain: 'localhost' } },
        HeaderService,
      ]
    })
      .overrideComponent(AppComponent, {
        remove: {
          imports: [HeaderComponent],
        },
        add: {
          imports: [HeaderStubComponent],
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;

    const headerService = TestBed.inject(HeaderService);
    setCanonicalSpy = spyOn(headerService, 'setCanonical').and.returnValue();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeDefined();
    expect(setCanonicalSpy).not.toHaveBeenCalled();
  });
});
