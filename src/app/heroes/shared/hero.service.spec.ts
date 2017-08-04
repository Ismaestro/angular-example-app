import {async, TestBed} from '@angular/core/testing';
import {HeroService} from './hero.service';
import {AppModule} from '../../app.module';
import {APP_BASE_HREF} from '@angular/common';
import {AppConfig} from '../../config/app.config';

describe('HeroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        HeroService
      ]
    });
  });

  it('should contains heroes', async(() => {
    let nameListService = TestBed.get(HeroService);

    nameListService.get().subscribe((data: any) => {
      expect(data.length).toBeGreaterThan(AppConfig.topHeroesLimit);
    });
  }));
});
