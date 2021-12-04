import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from '@gorniv/ngx-universal';
import { of, throwError } from 'rxjs';
import { Hero } from '../../hero/shared/hero.model';

describe('HeroService', () => {
  const heroId = 'BzTvl77YsRTtdihH0jeh';
  let heroService: HeroService;

  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open', 'dismiss', 'showSnackBar']);
  const afsSpy = jasmine.createSpyObj('AngularFirestore', ['doc', 'collection', 'delete']);

  TestBed.configureTestingModule({
    providers: [
      { provide: MatSnackBar, useValue: matSnackBarSpy },
      {
        provide: CookieService,
        useValue: {
          get: () => 0,
        },
      },
      HeroService,
    ],
  });

  beforeEach(() => {
    afsSpy.doc.and.returnValue({
      update: () => new Promise<void>(resolve => resolve()),
      get: () =>
        of({
          data: () =>
            new Hero({
              id: heroId,
              name: 'test',
              alterEgo: 'test',
            }),
        }),
      delete: () => new Promise<void>(resolve => resolve()),
    });

    afsSpy.collection.and.returnValue({
      add: () => new Promise<void>(resolve => resolve()),
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
