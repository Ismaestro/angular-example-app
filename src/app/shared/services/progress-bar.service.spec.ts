import {async, TestBed} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {APP_BASE_HREF} from '@angular/common';
import {ProgressBarService} from './progress-bar.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';

describe('ProgressBarService', () => {
  let progressBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
      ]
    });

    progressBarService = TestBed.get(ProgressBarService);
  });

  it('should contains heroes', (() => {
    expect(progressBarService.requestsRunning).toBe(0);
  }));
});
