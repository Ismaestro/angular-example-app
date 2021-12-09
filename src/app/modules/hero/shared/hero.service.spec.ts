import { TestBed, waitForAsync } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hero } from './hero.model';
import { ApolloTestingModule } from 'apollo-angular/testing';

xdescribe('HeroService', () => {
  const heroId = 'BzTvl77YsRTtdihH0jeh';
  let heroService: HeroService;

  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open', 'dismiss', 'showSnackBar']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule
      ],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        HeroService
      ]
    });

    heroService = TestBed.inject(HeroService);
  }));

  it('should get hero by id ' + heroId, () => {
    heroService.getHeroById(heroId).subscribe((hero: Hero) => {
      expect(hero.id).toEqual(heroId);
    });
  });

  it('should get heroes', () => {
    heroService.searchHeroes().subscribe((heroes: Hero[]) => {
      expect(heroes.length).toBe(1);
    });
  });

  it('should create a hero', async () => {
    await heroService.createHero(
      new Hero({
        name: 'test',
        alterEgo: 'test'
      })
    ).subscribe(async (response) => {
      console.log('response', response);
      expect(response).toBe(1);
    });
  });

  it('should update hero', () => {
    heroService
      .updateHero(
        new Hero({
          name: 'test',
          alterEgo: 'test'
        })
      )
      .then(() => {
      });
  });

  it('should delete hero', () => {
    heroService.removeHero('oneId').subscribe(() => {
    });
  });
});
