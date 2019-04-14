import {TestBed} from '@angular/core/testing';
import {HeroService} from './hero.service';
import {Hero} from './hero.model';
import {HttpErrorResponse} from '@angular/common/http';
import {configureTestSuite} from 'ng-bullet';
import {FirebaseModule} from '../../../shared/modules/firebase.module';
import {MatSnackBar} from '@angular/material';
import {TRANSLATIONS, TRANSLATIONS_FORMAT} from '@angular/core';
import {I18n} from '@ngx-translate/i18n-polyfill';

describe('HeroService', () => {
  const heroId = 'BzTvl77YsRTtdihH0jeh';
  let heroService: HeroService;
  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open', 'dismiss']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        FirebaseModule
      ],
      providers: [
        {provide: MatSnackBar, useValue: matSnackBarSpy},
        {provide: TRANSLATIONS, useValue: require(`raw-loader!./../../../../i18n/messages.en.xlf`)},
        {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
        I18n,
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
