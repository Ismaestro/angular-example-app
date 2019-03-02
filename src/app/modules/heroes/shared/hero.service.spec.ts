import {TestBed} from '@angular/core/testing';
import {HeroService} from './hero.service';
import {TestsModule} from '../../../shared/modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {Hero} from './hero.model';
import {HttpErrorResponse} from '@angular/common/http';
import {configureTestSuite} from 'ng-bullet';

describe('HeroService', () => {
  const heroId = 'BzTvl77YsRTtdihH0jeh';
  let heroService: HeroService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        HeroService
      ]
    });
  });

  beforeEach(() => {
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
