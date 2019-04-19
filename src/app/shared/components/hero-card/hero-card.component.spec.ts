import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroCardComponent} from './hero-card.component';
import {APP_CONFIG, AppConfig} from '../../../configs/app.config';
import {Hero} from '../../../modules/heroes/shared/hero.model';
import {configureTestSuite} from 'ng-bullet';
import {MockComponent, MockModule} from 'ng-mocks';
import {MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle, MatIcon, MatSnackBar} from '@angular/material';
import {FirebaseModule} from '../../modules/firebase.module';
import {TRANSLATIONS, TRANSLATIONS_FORMAT} from '@angular/core';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {of} from 'rxjs';
import {HeroService} from '../../../modules/heroes/shared/hero.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxProgressiveImageLoaderModule} from 'ngx-progressive-image-loader';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;
  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
  const heroServiceSpy = jasmine.createSpyObj('HeroService', ['checkIfUserCanVote', 'updateHero']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MockModule(FirebaseModule),
        MockModule(NgxProgressiveImageLoaderModule)
      ],
      declarations: [
        MockComponent(MatCard),
        MockComponent(MatCardTitle),
        MockComponent(MatCardHeader),
        MockComponent(MatCardSubtitle),
        MockComponent(MatIcon),
        HeroCardComponent
      ],
      providers: [
        {provide: MatSnackBar, useValue: matSnackBarSpy},
        {provide: HeroService, useValue: heroServiceSpy},
        {provide: TRANSLATIONS, useValue: require(`raw-loader!./../../../../i18n/messages.en.xlf`)},
        {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
        I18n,
        {provide: APP_CONFIG, useValue: AppConfig}
      ]
    });

    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    heroServiceSpy.updateHero.and.returnValue(of([new Hero({name: 'hero test'})]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should like a hero', () => {
    localStorage.setItem('votes', String(AppConfig.votesLimit - 1));
    const hero = new Hero({likes: 1});
    hero.like();
    expect(hero.likes).toBe(2);
  });
});
