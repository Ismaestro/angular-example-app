import {TestBed} from '@angular/core/testing';
import {ProgressBarService} from './progress-bar.service';
import {HeroService} from '../../modules/heroes/shared/hero.service';
import {configureTestSuite} from 'ng-bullet';
import {TestsModule} from '../../shared/modules/tests.module';

describe('ProgressBarService', () => {
  let progressBarService: ProgressBarService;
  let heroService: HeroService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule
      ],
      providers: [
        ProgressBarService,
        HeroService
      ]
    });
  });

  beforeEach(() => {
    progressBarService = TestBed.get(ProgressBarService);
    heroService = TestBed.get(HeroService);
  });

  it('should not be requestsRunning', (() => {
    expect(progressBarService.list()).toBe(0);
  }));

  it('should increase and decrease the counter of requests running', (() => {
    progressBarService.increase();
    progressBarService.increase();
    expect(progressBarService.list()).toBe(2);
    progressBarService.decrease();
    expect(progressBarService.list()).toBe(1);
    progressBarService.decrease();
    expect(progressBarService.list()).toBe(0);
    progressBarService.decrease();
    expect(progressBarService.list()).toBe(0);
  }));
});
