import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TestsModule} from '../../../../shared/modules/tests.module';
import {HeroService} from '../../shared/hero.service';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {HeroDetailPageComponent} from './hero-detail-page.component';
import {configureTestSuite} from 'ng-bullet';
import {HeroLoadingComponent} from '../../../../shared/components/hero-loading/hero-loading.component';
import {HeroCardComponent} from '../../../../shared/components/hero-card/hero-card.component';
import {LoadingPlaceholderComponent} from '../../../../shared/components/loading-placeholder/loading-placeholder.component';

describe('HeroDetailPage', () => {
  let component: HeroDetailPageComponent;
  let fixture: ComponentFixture<HeroDetailPageComponent>;
  let heroService: HeroService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule
      ],
      declarations: [
        HeroLoadingComponent,
        HeroCardComponent,
        LoadingPlaceholderComponent,
        HeroDetailPageComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: 'BzTvl77YsRTtdihH0jeh'
              })
            }
          }
        }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailPageComponent);
    component = fixture.debugElement.componentInstance;
    heroService = TestBed.get(HeroService);
  });

  it('should create hero detail component', (() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));
});
