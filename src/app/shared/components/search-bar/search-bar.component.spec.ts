import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchBarComponent} from './search-bar.component';
import {TestsModule} from '../../modules/tests.module';
import {HeroService} from '../../../modules/heroes/shared/hero.service';
import {Router} from '@angular/router';
import {Hero} from '../../../modules/heroes/shared/hero.model';
import {HomePageComponent} from '../../pages/home-page/home-page.component';
import {Error404PageComponent} from '../../pages/error404-page/error404-page.component';
import {of} from 'rxjs';
import {configureTestSuite} from 'ng-bullet';
import {HeroLoadingComponent} from '../hero-loading/hero-loading.component';
import {LoadingPlaceholderComponent} from '../loading-placeholder/loading-placeholder.component';
import {HeroCardComponent} from '../hero-card/hero-card.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let heroService: HeroService;
  let router: Router;
  let navigateSpy;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule
      ],
      declarations: [
        HeroLoadingComponent,
        LoadingPlaceholderComponent,
        HeroCardComponent,
        SearchBarComponent,
        HomePageComponent,
        Error404PageComponent
      ],
      providers: [
        HeroService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.debugElement.componentInstance;
    heroService = TestBed.get(HeroService);
    router = TestBed.get(Router);
    navigateSpy = spyOn(router, 'navigate');
  });

  it('should create hero search component', (() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('should get all heroes', (() => {
    spyOn(heroService, 'getHeroes').and.returnValue(of([new Hero({name: 'test1', default: true})]));
    fixture.detectChanges();
    expect(component.defaultHeroes.length).toBe(1);
    expect(component.defaultHeroes[0].default).toBe(true);
  }));

  it('should filter heroes array', (() => {
    fixture.detectChanges();
    component.defaultHeroes = [
      new Hero({'id': 1, 'name': 'batman', 'default': true}),
      new Hero({'id': 2, 'name': 'spiderman', 'default': false})
    ];
    expect(component.filterHeroes('batman').length).toBe(1);
    expect(component.filterHeroes('spiderman').length).toBe(0);
    expect(component.filterHeroes('').length).toBe(2);
  }));

  it('should navigate to hero detail', (() => {
    fixture.detectChanges();
    const heroId = 'BzTvl77YsRTtdihH0jeh';
    component.searchHero(new Hero({id: heroId}));
    expect(navigateSpy).toHaveBeenCalledWith(['heroes/' + heroId]);
  }));
});
