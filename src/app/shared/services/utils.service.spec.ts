import {TestBed} from '@angular/core/testing';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import {TestsModule} from '../modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {UtilsService} from './utils.service';

describe('UtilsService', () => {
  let utilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        UtilsService
      ]
    });

    utilsService = TestBed.get(UtilsService);
  });

  it('should check browser features', (() => {
    expect(utilsService.checkBrowserFeatures()).toBeTruthy();
  }));
});
