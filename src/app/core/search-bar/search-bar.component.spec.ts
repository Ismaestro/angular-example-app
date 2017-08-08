import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {AppModule} from '../../app.module';
import {HeroService} from '../../heroes/shared/hero.service';
import {SearchBarComponent} from './search-bar.component';

describe('SearchBarComponent', () => {
  let fixture;
  let component;
  let heroService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        HeroService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.debugElement.componentInstance;
    heroService = TestBed.get(HeroService);
  }));

  it('should create hero search component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should create hero search component', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(heroService, 'getAllHeroes').and.returnValue(Promise.resolve(true));
    tick();
    fixture.detectChanges();
    expect(component.defaultHeroes.length).toBeGreaterThan(0);
    for (let hero of component.defaultHeroes) {
      expect(hero.default).toBe(true);
    }
  }));
});
