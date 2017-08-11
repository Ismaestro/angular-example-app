import {TestBed} from '@angular/core/testing';
import {ProgressBarService} from './progress-bar.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import {HeroService} from '../../heroes/shared/hero.service';
import {TestsModule} from '../modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../config/app.config';

describe('ProgressBarService', () => {
  let progressBarService;
  let heroService;

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
    heroService = TestBed.get(HeroService);
  });

  it('should not be requestsRunning', (() => {
    const instance = new ProgressBarService(heroService);
    expect(instance).toBeTruthy();
  }));

  it('should not be requestsRunning', (() => {
    expect(progressBarService.requestsRunning).toBe(0);
  }));

  it('should increase and decrease the counter of requests running', (() => {
    heroService.request$.emit('starting');
    heroService.request$.emit('starting');
    expect(progressBarService.requestsRunning).toBe(2);
    heroService.request$.emit('finished');
    expect(progressBarService.requestsRunning).toBe(1);
    heroService.request$.emit('finished');
    expect(progressBarService.requestsRunning).toBe(0);
    heroService.request$.emit('finished');
    expect(progressBarService.requestsRunning).toBe(0);
  }));
});
