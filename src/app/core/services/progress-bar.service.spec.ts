import {TestBed} from '@angular/core/testing';
import {ProgressBarService} from './progress-bar.service';
import {configureTestSuite} from 'ng-bullet';
import {MockModule} from 'ng-mocks';
import {FirebaseModule} from '../../shared/modules/firebase.module';

describe('ProgressBarService', () => {
  let progressBarService: ProgressBarService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule(FirebaseModule)
      ],
      providers: [
        ProgressBarService,
      ]
    });

    progressBarService = TestBed.get(ProgressBarService);
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
