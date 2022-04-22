import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { of } from 'rxjs';
import { Hero } from '../../../hero/shared/hero.model';
import { HeroLoadingComponent } from '~shared/components/hero-loading/hero-loading.component';
import { HeroCardComponent } from '~shared/components/hero-card/hero-card.component';
import { LoadingPlaceholderComponent } from '~shared/components/loading-placeholder/loading-placeholder.component';
import { MockComponent } from 'ng-mocks';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HeroService } from '../../../hero/shared/hero.service';

describe('HomePage', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  const heroServiceSpy = jasmine.createSpyObj('HeroService', ['searchHeroes']);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule],
        declarations: [
          MockComponent(HeroCardComponent),
          MockComponent(HeroLoadingComponent),
          MockComponent(LoadingPlaceholderComponent),
          HomePageComponent,
        ],
        providers: [{ provide: HeroService, useValue: heroServiceSpy }],
      }).compileComponents();

      fixture = TestBed.createComponent(HomePageComponent);
      component = fixture.debugElement.componentInstance;
      heroServiceSpy.searchHeroes.and.returnValue(of([new Hero({ name: 'hero test' })]));
      fixture.detectChanges();
    })
  );

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should initialice heroes',
    waitForAsync(() => {
      fixture.whenStable().then(() => {
        expect(fixture.debugElement.queryAll(By.css('app-hero-card')).length).toBe(1);
      });
    })
  );
});
