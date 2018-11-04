import {async, TestBed} from '@angular/core/testing';
import {HeroService} from './hero.service';
import {APP_BASE_HREF} from '@angular/common';
import {TestsModule} from '../../../shared/modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../../configs/app.config';
import {Hero} from './hero.model';
import {HttpErrorResponse} from '@angular/common/http';

describe('HeroService', () => {
  const heroId = 'BzTvl77YsRTtdihH0jeh';
  let heroService: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        HeroService
      ]
    });

    heroService = TestBed.get(HeroService);
  });

  it('should get hero by id ' + heroId, (() => {
    heroService.getHero(heroId).subscribe((hero: Hero) => {
      expect(hero.id).toEqual(heroId);
    });
  }));

  it('should fail getting hero by no id', (() => {
    heroService.getHero('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should fail creating empty hero', (() => {
    heroService.createHero(new Hero({
      'name': 'test',
      'alterEgo': 'test'
    })).then(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

});
