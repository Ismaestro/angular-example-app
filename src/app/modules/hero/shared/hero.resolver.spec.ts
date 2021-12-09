import { TestBed, waitForAsync } from '@angular/core/testing';
import { HeroResolver } from './hero.resolver';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Hero } from './hero.model';
import { of } from 'rxjs';
import { HeroService } from './hero.service';

describe('HeroResolver', () => {
  let heroResolver: HeroResolver;
  let route: ActivatedRoute;

  const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroById']);
  const heroId = '123';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: heroId }) } },
        },
        HeroResolver,
      ],
    }).compileComponents();

    heroResolver = TestBed.inject(HeroResolver);
    route = TestBed.inject(ActivatedRoute);
  }));

  it('should resolve a hero by id', async () => {
    heroServiceSpy.getHeroById.and.returnValue(of(new Hero({ id: heroId })));
    heroResolver.resolve(route.snapshot).then(async (heroObservable) => {
      await heroObservable.subscribe(hero => {
        expect(hero.id).toBe(heroId);
      });
    });
  });
});
