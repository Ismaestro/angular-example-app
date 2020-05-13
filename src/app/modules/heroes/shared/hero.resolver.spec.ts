import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { HeroResolver } from './hero.resolver';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Hero } from './hero.model';
import { of } from 'rxjs';
import { HeroService } from '../../core/services/hero.service';

describe('HeroResolver', () => {
  let heroResolver: HeroResolver;
  let route: ActivatedRoute;

  const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHero']);
  const heroId = '123';

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: heroId }) } },
        },
        HeroResolver,
      ],
    });
  });

  beforeEach(() => {
    heroResolver = TestBed.inject(HeroResolver);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should resolve a hero by id', () => {
    heroServiceSpy.getHero.and.returnValue(of(new Hero({ id: heroId })));
    heroResolver.resolve(route.snapshot).subscribe(hero => {
      expect(hero.id).toBe(heroId);
    });
  });
});
