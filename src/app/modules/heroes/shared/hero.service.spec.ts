import {TestBed} from '@angular/core/testing';
import {HeroService} from './hero.service';
import {Hero} from './hero.model';
import {HttpErrorResponse} from '@angular/common/http';
import {configureTestSuite} from 'ng-bullet';
import {FirebaseModule} from '../../../shared/modules/firebase.module';
import {MatSnackBar} from '@angular/material/snack-bar';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {CookieService} from 'ngx-cookie';
import {AngularFirestore} from '@angular/fire/firestore';
import {of} from 'rxjs';

describe('HeroService', () => {
  const heroId = 'BzTvl77YsRTtdihH0jeh';
  let heroService: HeroService;

  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open', 'dismiss']);
  const afsSpy = jasmine.createSpyObj('AngularFirestore', ['doc', 'collection']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        FirebaseModule
      ],
      providers: [
        {provide: AngularFirestore, useValue: afsSpy},
        {provide: MatSnackBar, useValue: matSnackBarSpy},
        {provide: CookieService, useValue: {}},
        {
          provide: I18n, useValue: () => {
          }
        },
        HeroService
      ]
    });
  });

  beforeEach(() => {
    afsSpy.doc.and.returnValue({
      update: () => new Promise(() => {}),
      get: () => of({data: () => new Hero({
          id: heroId,
          name: 'test',
          alterEgo: 'test'
        })})
    });

    afsSpy.collection.and.returnValue({
      add: () => new Promise(() => {})
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
      name: 'test',
      alterEgo: 'test'
    })).then(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should update hero', (() => {
    heroService.updateHero(new Hero({
      name: 'test',
      alterEgo: 'test'
    })).then((algo) => {
      expect(algo).toBeDefined();
    });
  }));
});
