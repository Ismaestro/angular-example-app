import {async, TestBed} from '@angular/core/testing';
import {HeroService} from './hero.service';
import {APP_BASE_HREF} from '@angular/common';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {TestsModule} from '../../shared/modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

describe('HeroService', () => {
  let heroService;
  let newHeroCreated;

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

  it('should contains heroes', async(() => {
    heroService.getAllHeroes().subscribe((data: any) => {
      expect(data.length).toBeGreaterThan(AppConfig.topHeroesLimit);
    });
  }));

  it('should get hero by id 1', async(() => {
    heroService.getHeroById('1').subscribe((hero) => {
      expect(hero.id).toEqual(1);
    });
  }));

  it('should fail getting hero by no id', async(() => {
    heroService.getHeroById('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should fail creating empty hero', async(() => {
    heroService.createHero({}).subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should fail deleting noId hero', async(() => {
    heroService.deleteHeroById('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should fail like empty hero', async(() => {
    localStorage.setItem('votes', String(0));
    heroService.like('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should return json response error', async(() => {
    expect(heroService.handleError(new Response('noId'))).toEqual(jasmine.any(ErrorObservable));
  }));

  it('should create hero', async(() => {
    heroService.createHero({
      'name': 'test',
      'alterEgo': 'test'
    }).subscribe((hero) => {
      newHeroCreated = hero;
      expect(hero.id).not.toBeNull();
    });
  }));

  it('should not like a hero because no votes', async(() => {
    localStorage.setItem('votes', String(AppConfig.votesLimit));
    expect(heroService.checkIfUserCanVote()).toBe(false);
    heroService.like(newHeroCreated).subscribe(() => {
    }, (error) => {
      expect(error).toBe('maximum votes');
    });
  }));

  it('should like a hero', async(() => {
    localStorage.setItem('votes', String(0));
    expect(heroService.checkIfUserCanVote()).toBe(true);
    heroService.like(newHeroCreated).subscribe((response) => {
      expect(response).toEqual({});
    });
  }));

  it('should delete a hero', async(() => {
    heroService.deleteHeroById(newHeroCreated.id).subscribe((response) => {
      expect(response).toEqual({});
    });
  }));
});
