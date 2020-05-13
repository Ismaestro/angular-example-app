import { TestBed } from '@angular/core/testing';
import { ProgressBarService } from './progress-bar.service';
import { configureTestSuite } from 'ng-bullet';

describe('ProgressBarService', () => {
  let progressBarService: ProgressBarService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [ProgressBarService],
    });

    progressBarService = TestBed.inject(ProgressBarService);
  });

  it('should not be requestsRunning', () => {
    expect(progressBarService.list()).toBe(0);
  });

  it('should increase and decrease the counter of requests running', () => {
    progressBarService.increase();
    progressBarService.increase();
    expect(progressBarService.list()).toBe(2);
    progressBarService.decrease();
    expect(progressBarService.list()).toBe(1);
    progressBarService.decrease();
    expect(progressBarService.list()).toBe(0);
    progressBarService.decrease();
    expect(progressBarService.list()).toBe(0);
  });
});
