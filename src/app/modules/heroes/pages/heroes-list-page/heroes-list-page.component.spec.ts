import {async, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {HeroesModule} from '../../heroes.module';
import {TestsModule} from '../../../../shared/modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {HeroService} from '../../shared/hero.service';
import {APP_CONFIG, AppConfig} from '../../../../configs/app.config';
import {HeroesListPageComponent} from './heroes-list-page.component';
import {configureTestSuite} from 'ng-bullet';

describe('HeroListComponent', () => {
  let fixture;
  let component;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
        HeroesModule
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        HeroService
      ],
    });

    fixture = TestBed.createComponent(HeroesListPageComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
  });

  it('should create hero list component', (() => {
    expect(component).toBeTruthy();
  }));
});
