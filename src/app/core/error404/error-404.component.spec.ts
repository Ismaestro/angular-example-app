import {async, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {HeroService} from '../../heroes/shared/hero.service';
import {MaterialModule} from '../../shared/modules/material.module';
import {ProgressBarService} from '../progress-bar.service';
import {TestsModule} from '../../shared/modules/tests.module';
import {Error404Component} from './error-404.component';

describe('Error404Component', () => {
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
        Error404Component
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        HeroService,
        ProgressBarService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Error404Component);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    progressBarService = TestBed.get(ProgressBarService);
  }));

  it('should create nav component', (() => {
    expect(component).toBeTruthy();
  }));
});
