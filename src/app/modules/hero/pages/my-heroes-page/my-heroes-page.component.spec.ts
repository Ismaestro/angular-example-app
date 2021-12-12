import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MyHeroesPageComponent } from './my-heroes-page.component';
import { LoadingPlaceholderComponent } from '../../../../shared/components/loading-placeholder/loading-placeholder.component';
import { Hero } from '../../shared/hero.model';
import { of } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeroRemoveComponent } from '../../components/hero-remove/hero-remove.component';
import { Router } from '@angular/router';
import { MockComponent, MockModule } from 'ng-mocks';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxScrollToFirstInvalidModule } from '@ismaestro/ngx-scroll-to-first-invalid';
import { RouterTestingModule } from '@angular/router/testing';
import { ROUTES_CONFIG, RoutesConfig } from '../../../../configs/routes.config';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeroService } from '../../shared/hero.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('HeroesListPageComponent', () => {
  let component: MyHeroesPageComponent;
  let fixture: ComponentFixture<MyHeroesPageComponent>;
  let router: Router;
  let navigateSpy;

  const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open', 'dismiss']);
  const heroServiceSpy = jasmine.createSpyObj('HeroService', [
    'createHero',
    'searchHeroes',
    'updateHero',
    'removeHero',
    'showSnackBar',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ApolloTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatListModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MockModule(NgxScrollToFirstInvalidModule),
      ],
      declarations: [
        MockComponent(HeroRemoveComponent),
        MockComponent(LoadingPlaceholderComponent),
        MyHeroesPageComponent,
      ],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: ROUTES_CONFIG, useValue: RoutesConfig },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MyHeroesPageComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
    heroServiceSpy.searchHeroes.and.returnValue(of([new Hero({ is: 1, name: 'hero test' })]));
    heroServiceSpy.removeHero.and.returnValue(of(true));
    fixture.detectChanges();
  }));

  it('should create component and load heroes', () => {
    expect(component).toBeTruthy();
  });

  xit('should create new hero success', () => {
    heroServiceSpy.createHero.and.returnValue(of('asd'));
    component.newHeroForm = new FormGroup({
      name: new FormControl('new hero!', [Validators.required, Validators.maxLength(30)]),
      alterEgo: new FormControl('haha', [Validators.required, Validators.maxLength(30)]),
    });

    component.error = false;
    component.createNewHero();
    expect(component.error).toBeFalse();
  });

  xit('should create new hero error', async () => {
    heroServiceSpy.createHero.and.returnValue(of(''));
    component.newHeroForm = new FormGroup({
      name: new FormControl('new hero!', [Validators.required, Validators.maxLength(30)]),
      alterEgo: new FormControl('haha', [Validators.required, Validators.maxLength(30)]),
    });

    component.error = false;
    await component.createNewHero();
    expect(component.error).toBe(true);
  });

  it('should delete a hero', () => {
    const hero = new Hero({ id: 'testId' });
    matDialogSpy.open.and.returnValue({
      afterClosed: () => {
        return of(true);
      },
    });
    heroServiceSpy.removeHero.and.returnValue(of(true));
    component.deleteHero(hero);
    expect(heroServiceSpy.removeHero).toHaveBeenCalledWith('testId');
  });
});
