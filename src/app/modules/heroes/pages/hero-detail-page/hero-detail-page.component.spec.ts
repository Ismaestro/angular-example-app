import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {HeroDetailPageComponent} from './hero-detail-page.component';
import {configureTestSuite} from 'ng-bullet';
import {HeroLoadingComponent} from '../../../../shared/components/hero-loading/hero-loading.component';
import {HeroCardComponent} from '../../../../shared/components/hero-card/hero-card.component';
import {MockComponent, MockModule} from 'ng-mocks';
import {FirebaseModule} from '../../../../shared/modules/firebase.module';
import {MatSnackBar} from '@angular/material';
import {TRANSLATIONS, TRANSLATIONS_FORMAT} from '@angular/core';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {HeroService} from '../../shared/hero.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Hero} from '../../shared/hero.model';
import {of} from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('HeroDetailPage', () => {
  let component: HeroDetailPageComponent;
  let fixture: ComponentFixture<HeroDetailPageComponent>;
  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
  const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHero']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule(FirebaseModule),
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        MockComponent(HeroLoadingComponent),
        MockComponent(HeroCardComponent),
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
        },
        {provide: MatSnackBar, useValue: matSnackBarSpy},
        {provide: HeroService, useValue: heroServiceSpy},
        {provide: TRANSLATIONS, useValue: require(`raw-loader!./../../../../../i18n/messages.en.xlf`)},
        {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
        I18n
      ]
    });

    fixture = TestBed.createComponent(HeroDetailPageComponent);
    component = fixture.debugElement.componentInstance;
    heroServiceSpy.getHero.and.returnValue(of(new Hero({'id': '1', 'name': 'test', 'default': true})));
    fixture.detectChanges();
  });

  it('should create hero detail component', (() => {
    expect(component).toBeTruthy();
    expect(component.hero.id).toBe('1');
  }));
});
