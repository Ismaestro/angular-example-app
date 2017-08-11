import {TestBed} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {APP_BASE_HREF} from '@angular/common';
import {ProgressBarService} from './progress-bar.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import {HeroService} from '../../heroes/shared/hero.service';
import {TestsModule} from '../modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../config/app.config';

describe('ProgressBarService', () => {
  let progressBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        ProgressBarService,
        HeroService
      ]
    });

    progressBarService = TestBed.get(ProgressBarService);
  });

  it('should contains heroes', (() => {
    expect(progressBarService.requestsRunning).toBe(0);
  }));
});
