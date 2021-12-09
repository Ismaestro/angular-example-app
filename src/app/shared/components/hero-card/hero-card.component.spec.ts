import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HeroCardComponent } from './hero-card.component';
import { Hero } from '../../../modules/hero/shared/hero.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ROUTES_CONFIG, RoutesConfig } from '../../../configs/routes.config';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { HeroService } from '../../../modules/hero/shared/hero.service';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;

  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
  const heroServiceSpy = jasmine.createSpyObj('HeroService', ['checkIfUserCanVote', 'updateHero']);

  beforeEach(waitForAsync(() => {
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
        { provide: ROUTES_CONFIG, useValue: RoutesConfig }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    heroServiceSpy.updateHero.and.returnValue(of([new Hero({ name: 'hero test' })]));
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should like a hero', () => {
    const hero = new Hero({ likes: 1 });
    hero.like();
    expect(hero.votes).toBe(2);
  });
});
