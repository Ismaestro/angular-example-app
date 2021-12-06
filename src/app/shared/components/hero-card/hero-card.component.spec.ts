import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroCardComponent } from './hero-card.component';
import { Hero } from '../../../modules/hero/shared/hero.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ROUTES_CONFIG, RoutesConfig } from '../../../configs/routes.config';
import { CookieService } from '@gorniv/ngx-universal';
import { PLATFORM_ID } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { HeroService } from '../../../modules/hero/shared/hero.service';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;

  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
  const heroServiceSpy = jasmine.createSpyObj('HeroService', ['checkIfUserCanVote', 'updateHero']);

  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      MatCardModule,
      MatIconModule,
      LazyLoadImageModule
    ],
    declarations: [
      HeroCardComponent
    ],
    providers: [
      { provide: MatSnackBar, useValue: matSnackBarSpy },
      { provide: HeroService, useValue: heroServiceSpy },
      { provide: CookieService, useValue: {} },
      { provide: ROUTES_CONFIG, useValue: RoutesConfig },
      { provide: PLATFORM_ID, useValue: 'browser' }
    ]
  }).compileComponents();

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    heroServiceSpy.updateHero.and.returnValue(of([new Hero({ name: 'hero test' })]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should like a hero', () => {
    const hero = new Hero({ likes: 1 });
    hero.like();
    expect(hero.votes).toBe(2);
  });
});
