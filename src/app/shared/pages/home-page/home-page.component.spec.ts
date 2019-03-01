import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';
import {DebugElement} from '@angular/core';
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
  let debugElement: DebugElement;
  let heroService: HeroService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        HomePageComponent,
        HeroCardComponent,
        HeroLoadingComponent,
        LoadingPlaceholderComponent
      ],
      providers: [
        HeroService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    debugElement = fixture.debugElement;
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
