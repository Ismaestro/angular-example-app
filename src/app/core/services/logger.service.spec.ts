import {TestBed} from '@angular/core/testing';
import {LoggerService} from './logger.service';

describe('LoggerService', () => {
  let loggerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggerService
      ]
    });

    loggerService = TestBed.get(LoggerService);
  });

  it('should log without errors', (() => {
    expect(loggerService).toBeDefined();
    expect(LoggerService.error('This is an error')).toBeUndefined();
    expect(LoggerService.log('This is a log')).toBeUndefined();
  }));
});
