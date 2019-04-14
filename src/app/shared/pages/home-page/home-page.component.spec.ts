import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroService} from '../../../modules/heroes/shared/hero.service';
import {HomePageComponent} from './home-page.component';
import {of} from 'rxjs';
import {Hero} from '../../../modules/heroes/shared/hero.model';
import {configureTestSuite} from 'ng-bullet';
import {HeroLoadingComponent} from '../../components/hero-loading/hero-loading.component';
import {HeroCardComponent} from '../../components/hero-card/hero-card.component';
import {LoadingPlaceholderComponent} from '../../components/loading-placeholder/loading-placeholder.component';
import {MockComponent, MockModule} from 'ng-mocks';
import {FirebaseModule} from '../../modules/firebase.module';
import {MatSnackBar} from '@angular/material';
import {TRANSLATIONS, TRANSLATIONS_FORMAT} from '@angular/core';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';

describe('HomePage', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);
  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule(FirebaseModule),
        BrowserAnimationsModule
      ],
      declarations: [
        MockComponent(HeroCardComponent),
        MockComponent(HeroLoadingComponent),
        MockComponent(LoadingPlaceholderComponent),
        HomePageComponent
      ],
      providers: [
        {provide: MatSnackBar, useValue: matSnackBarSpy},
        {provide: HeroService, useValue: heroServiceSpy},
        {provide: TRANSLATIONS, useValue: require(`raw-loader!./../../../../i18n/messages.en.xlf`)},
        {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
        I18n
      ]
    });

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.debugElement.componentInstance;
    heroServiceSpy.getHeroes.and.returnValue(of([new Hero({name: 'hero test'})]));
    fixture.detectChanges();
  });

  it('should create component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should initialice heroes', async(() => {
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.queryAll(By.css('app-hero-card')).length).toBe(1);
    });
  }));
});
