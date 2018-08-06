import {async, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../../config/app.config';
import {MaterialModule} from '../../../shared/modules/material.module';
import {TestsModule} from '../../../shared/modules/tests.module';
import {Error404Page} from './error404.page';
import {HeroService} from '../../../modules/heroes/shared/hero.service';
import {ProgressBarService} from '../../services/progress-bar.service';

describe('Error404Page', () => {
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
        Error404Page
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        HeroService,
        ProgressBarService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Error404Page);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    progressBarService = TestBed.get(ProgressBarService);
  }));

  it('should create nav component', (() => {
    expect(component).toBeTruthy();
  }));
});
