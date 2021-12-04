import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let loggerService: LoggerService;

  TestBed.configureTestingModule({
    providers: [LoggerService],
  }).compileComponents();

  loggerService = TestBed.inject(LoggerService);

  it('should log without errors', () => {
    expect(LoggerService.error('This is an error')).toBeUndefined();
    expect(LoggerService.log('This is a log')).toBeUndefined();
  });
});
