import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroCardComponent} from './hero-card.component';
import {Hero} from '../../../modules/heroes/shared/hero.model';
import {configureTestSuite} from 'ng-bullet';
import {MockComponent} from 'ng-mocks';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {of} from 'rxjs';
import {HeroService} from '../../../modules/heroes/shared/hero.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ROUTES_CONFIG, RoutesConfig} from '../../../configs/routes.config';
import {CookieService} from 'ngx-cookie';
import {PLATFORM_ID} from '@angular/core';
import {ProgressiveImageLoaderComponent} from 'ngx-progressive-image-loader';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;

  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
  const heroServiceSpy = jasmine.createSpyObj('HeroService', ['checkIfUserCanVote', 'updateHero']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatIconModule
      ],
      declarations: [
        MockComponent(ProgressiveImageLoaderComponent),
        HeroCardComponent
      ],
      providers: [
        {provide: MatSnackBar, useValue: matSnackBarSpy},
        {provide: HeroService, useValue: heroServiceSpy},
        {
          provide: I18n, useValue: () => {
          }
        },
        {provide: CookieService, useValue: {}},
        {provide: ROUTES_CONFIG, useValue: RoutesConfig},
        {provide: PLATFORM_ID, useValue: 'browser'}
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    heroServiceSpy.updateHero.and.returnValue(of([new Hero({name: 'hero test'})]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should like a hero', () => {
    const hero = new Hero({likes: 1});
    hero.like();
    expect(hero.likes).toBe(2);
  });
});
