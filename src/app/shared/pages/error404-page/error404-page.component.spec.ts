import {async, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {MaterialModule} from '../../modules/material.module';
import {TestsModule} from '../../modules/tests.module';
import {HeroService} from '../../../modules/heroes/shared/hero.service';
import {ProgressBarService} from '../../../core/services/progress-bar.service';
import {Error404PageComponent} from './error404-page.component';
import {APP_CONFIG, AppConfig} from '../../../configs/app.config';
import {configureTestSuite} from 'ng-bullet';

describe('Error404Page', () => {
  let fixture;
  let component;
  let progressBarService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
        MaterialModule
      ],
      declarations: [
        Error404PageComponent
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        HeroService,
        ProgressBarService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(Error404PageComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    progressBarService = TestBed.get(ProgressBarService);
  });

  it('should create nav component', (() => {
    expect(component).toBeTruthy();
  }));
});
