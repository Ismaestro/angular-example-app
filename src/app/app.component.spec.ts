import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import { HeaderService } from '~core/services/ui/header.service';
import { ENVIRONMENT } from '~core/tokens/environment.token';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { HeaderComponent } from '~shared/components/header/header.component';
import type { Mock } from 'vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

@Component({
  selector: 'app-header',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HeaderStubComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let setCanonicalSpy: Mock<(absolutePath: string) => void>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ENVIRONMENT, useValue: { domain: 'localhost' } },
        HeaderService,
      ],
    })
      .overrideComponent(AppComponent, {
        remove: {
          imports: [HeaderComponent],
        },
        add: {
          imports: [HeaderStubComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;

    const headerService = TestBed.inject(HeaderService);
    setCanonicalSpy = vi.spyOn(headerService, 'setCanonical').mockReturnValue();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeDefined();
    expect(setCanonicalSpy).not.toHaveBeenCalled();
  });
});
