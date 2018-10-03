import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {SearchBarComponent} from './search-bar.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {AppRoutingModule} from '../../../app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import {TestsModule} from '../../modules/tests.module';
import {HeroService} from '../../../modules/heroes/shared/hero.service';
import {Router} from '@angular/router';
import {Hero} from '../../../modules/heroes/shared/hero.model';
import {HomePageComponent} from '../../pages/home-page/home-page.component';
import {Error404PageComponent} from '../../pages/error404-page/error404-page.component';
import {APP_CONFIG, AppConfig} from '../../../configs/app.config';

describe('HeroSearchComponent', () => {
  let fixture;
  let component;
  let heroService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
        AppRoutingModule
      ],
      declarations: [
        SearchBarComponent,
        HomePageComponent,
        Error404PageComponent
      ],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        },
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        HeroService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    heroService = TestBed.get(HeroService);
  }));

  it('should create hero search component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should get all heroes', fakeAsync(() => {
    spyOn(heroService, 'getHeroes').and.returnValue(Promise.resolve(true));
    tick();
    fixture.detectChanges();
    expect(component.defaultHeroes.length).toBeGreaterThan(0);
    for (const hero of component.defaultHeroes) {
      expect(hero.default).toBe(true);
    }
  }));

  it('should filter heroes array', (() => {
    component.defaultHeroes = [
      {
        'id': 1,
        'name': 'batman',
        'default': true
      },
      {
        'id': 2,
        'name': 'spiderman',
        'default': false
      }
    ];
    expect(component.filterHeroes('batman').length).toBe(1);
    expect(component.filterHeroes('spiderman').length).toBe(0);
    expect(component.filterHeroes().length).toBe(2);
  }));

  it('should navigate to hero detail', (() => {
    const router = fixture.debugElement.injector.get(Router);
    component.searchHero(new Hero(5, 'test name', 'test alterEgo', 0));
    expect(router.navigate).toHaveBeenCalledWith(['heroes/5']);
  }));
});
