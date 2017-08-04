import {inject, TestBed} from '@angular/core/testing';
import {LoggerService} from './logger.service';

describe('LoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggerService
      ]
    });
  });

  it('Should log without errors',
    inject([LoggerService], (loggerService) => {
      expect(loggerService).toBeDefined();
      LoggerService.error('This is an error');
      LoggerService.log('This is an log');
    }));
});
