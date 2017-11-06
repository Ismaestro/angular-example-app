import {async, TestBed} from '@angular/core/testing';
import {NavComponent} from './nav.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {HeroService} from '../../heroes/shared/hero.service';
import {MaterialModule} from '../../shared/modules/material.module';
import {ProgressBarService} from '../progress-bar.service';
import {TestsModule} from '../../shared/modules/tests.module';

describe('NavComponent', () => {
  let fixture;
  let component;
  let progressBarService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
        MaterialModule
      ],
      declarations: [
        NavComponent
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        HeroService,
        ProgressBarService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    progressBarService = TestBed.get(ProgressBarService);
  }));

  it('should create nav component with constructor', (() => {
    const translateService = TestBed.get(TranslateService);
    const instance = new NavComponent(AppConfig, progressBarService, translateService);
    expect(instance).toBeTruthy();
  }));

  it('should create nav component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should update progress bar', (() => {
    expect(component.progressBarMode).toBeUndefined();
    progressBarService.updateProgressBar$.emit('query');
    expect(component.progressBarMode).toBe('query');
  }));

  it('should change language to spanish', (() => {
    expect(component.translateService.currentLang).toBeUndefined();
    component.changeLanguage('es');
    expect(component.translateService.currentLang).toBe('es');
  }));
});
