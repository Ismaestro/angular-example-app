import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { HttpErrorResponse } from '@angular/common/http';
import { configureTestSuite } from 'ng-bullet';
import { FirebaseModule } from '../../../shared/modules/firebase.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { CookieService } from '@gorniv/ngx-universal';
import { AngularFirestore } from '@angular/fire/firestore';
import { of, throwError } from 'rxjs';
import { Hero } from '../../heroes/shared/hero.model';

describe('HeroService', () => {
  const heroId = 'BzTvl77YsRTtdihH0jeh';
  let heroService: HeroService;

  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open', 'dismiss', 'showSnackBar']);
  const afsSpy = jasmine.createSpyObj('AngularFirestore', ['doc', 'collection', 'delete']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseModule],
      providers: [
        { provide: AngularFirestore, useValue: afsSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        {
          provide: CookieService,
          useValue: {
            get: () => 0,
          },
        },
        {
          provide: I18n,
          useValue: () => {},
        },
        HeroService,
      ],
    });
  });

  beforeEach(() => {
    afsSpy.doc.and.returnValue({
      update: () => new Promise(resolve => resolve()),
      get: () =>
        of({
          data: () =>
            new Hero({
              id: heroId,
              name: 'test',
              alterEgo: 'test',
            }),
        }),
      delete: () => new Promise(resolve => resolve()),
    });

    afsSpy.collection.and.returnValue({
      add: () => new Promise(resolve => resolve()),
      snapshotChanges: () =>
        of([
          {
            payload: {
              doc: {
                id: 'asd',
                data: () => {
                  return {
                    id: 'noid',
                    name: 'test',
                  };
                },
              },
            },
          },
        ]),
    });

    heroService = TestBed.inject(HeroService);
  });

  it('should get hero by id ' + heroId, () => {
    heroService.getHero(heroId).subscribe((hero: Hero) => {
      expect(hero.id).toEqual(heroId);
    });
  });

  it('should get heroes', () => {
    heroService.getHeroes().subscribe((heroes: Hero[]) => {
      expect(heroes.length).toBe(1);
    });
  });

  it('should fail getting hero by no id', () => {
    heroService.getHero('noId').subscribe(
      () => {},
      error => {
        expect(error).toEqual(jasmine.any(HttpErrorResponse));
      }
    );
  });

  it('should create a hero', () => {
    heroService
      .createHero(
        new Hero({
          name: 'test',
          alterEgo: 'test',
        })
      )
      .then(() => {
        expect(afsSpy.collection).toHaveBeenCalled();
      });
  });

  it('should update hero', () => {
    heroService
      .updateHero(
        new Hero({
          name: 'test',
          alterEgo: 'test',
        })
      )
      .then(() => {
        expect(afsSpy.doc).toHaveBeenCalled();
      });
  });

  it('should delete hero', () => {
    heroService.deleteHero('oneId').then(() => {
      expect(afsSpy.doc).toHaveBeenCalled();
    });
  });

  it('should check if user can vote', () => {
    expect(heroService.checkIfUserCanVote()).toBe(true);
  });

  it('should fail getting one hero', () => {
    afsSpy.doc.and.returnValue({
      get: () => throwError({ message: 'this is an error', status: 404 }),
    });

    heroService.getHero('asd').subscribe(
      () => {},
      error => {
        expect(error.status).toBe(404);
      }
    );

    afsSpy.doc.and.returnValue({
      get: () => throwError({ message: 'this is an error', status: 500 }),
    });

    heroService.getHero('internal error').subscribe(
      () => {},
      error => {
        expect(error.status).toBe(500);
      }
    );
  });
});
