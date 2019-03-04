import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TestsModule} from '../../modules/tests.module';
import {HeroService} from '../../../modules/heroes/shared/hero.service';
import {HomePageComponent} from './home-page.component';
import {of} from 'rxjs';
import {Hero} from '../../../modules/heroes/shared/hero.model';
import {configureTestSuite} from 'ng-bullet';
import {HeroLoadingComponent} from '../../components/hero-loading/hero-loading.component';
import {HeroCardComponent} from '../../components/hero-card/hero-card.component';
import {LoadingPlaceholderComponent} from '../../components/loading-placeholder/loading-placeholder.component';

describe('HomePage', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let heroService: HeroService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
      ],
      declarations: [
        HeroCardComponent,
        HeroLoadingComponent,
        LoadingPlaceholderComponent,
        HomePageComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.debugElement.componentInstance;
    heroService = TestBed.get(HeroService);
  });

  it('should create component', (() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('should initialice heroes', (() => {
    spyOn(heroService, 'getHeroes').and.returnValue(of([new Hero({name: 'hero test'})]));
    fixture.detectChanges();
    expect(component.heroes.length).toBe(1);
  }));
});
