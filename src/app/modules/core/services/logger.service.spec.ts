import { TestBed, waitForAsync } from '@angular/core/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let loggerService: LoggerService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService]
    }).compileComponents();

    loggerService = TestBed.inject(LoggerService);
  }));

  it('should log without errors', () => {
    expect(loggerService).toBeDefined();
  });
});
