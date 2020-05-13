import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';
import { configureTestSuite } from 'ng-bullet';

describe('LoggerService', () => {
  let loggerService: LoggerService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService],
    });

    loggerService = TestBed.inject(LoggerService);
  });

  it('should log without errors', () => {
    expect(LoggerService.error('This is an error')).toBeUndefined();
    expect(LoggerService.log('This is a log')).toBeUndefined();
  });
});
