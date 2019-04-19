import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroesListPageComponent} from './heroes-list-page.component';
import {configureTestSuite} from 'ng-bullet';
import {LoadingPlaceholderComponent} from '../../../../shared/components/loading-placeholder/loading-placeholder.component';
import {HeroService} from '../../shared/hero.service';
import {Hero} from '../../shared/hero.model';
import {of} from 'rxjs';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HeroRemoveComponent} from '../../components/hero-remove/hero-remove.component';
import {Router} from '@angular/router';
import {APP_CONFIG, AppConfig} from '../../../../configs/app.config';
import {MockComponent, MockModule} from 'ng-mocks';
import {MatDialog, MatError, MatFormField, MatIcon, MatList, MatListItem, MatSnackBar} from '@angular/material';
import {NgxScrollToFirstInvalidModule} from '@ismaestro/ngx-scroll-to-first-invalid';
import {RouterTestingModule} from '@angular/router/testing';
import {TRANSLATIONS, TRANSLATIONS_FORMAT} from '@angular/core';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('HeroesListPageComponent', () => {
  let component: HeroesListPageComponent;
  let fixture: ComponentFixture<HeroesListPageComponent>;
  let router: Router;
  let navigateSpy;
  const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open', 'dismiss']);
  const heroServiceSpy = jasmine.createSpyObj('HeroService',
    ['checkIfUserCanVote', 'createHero', 'getHeroes', 'updateHero', 'deleteHero', 'showSnackBar']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MockModule(NgxScrollToFirstInvalidModule)
      ],
      declarations: [
        MockComponent(MatList),
        MockComponent(MatListItem),
        MockComponent(MatIcon),
        MockComponent(MatFormField),
        MockComponent(MatError),
        MockComponent(HeroRemoveComponent),
        MockComponent(LoadingPlaceholderComponent),
        HeroesListPageComponent
      ],
      providers: [
        {provide: MatSnackBar, useValue: matSnackBarSpy},
        {provide: MatDialog, useValue: matDialogSpy},
        {provide: HeroService, useValue: heroServiceSpy},
        {provide: TRANSLATIONS, useValue: require(`raw-loader!./../../../../../i18n/messages.en.xlf`)},
        {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
        I18n,
        {provide: APP_CONFIG, useValue: AppConfig}
      ]
    });

    heroServiceSpy.checkIfUserCanVote.and.returnValue(true);
    fixture = TestBed.createComponent(HeroesListPageComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.get(Router);
    navigateSpy = spyOn(router, 'navigate');
    heroServiceSpy.getHeroes.and.returnValue(of([new Hero({is: 1, name: 'hero test'})]));
    fixture.detectChanges();
  });

  it('should create component and load heroes', (() => {
    expect(component).toBeTruthy();
    expect(component.heroes.length).toBe(1);
    expect(component.heroes[0].name).toBe('hero test');
  }));

  it('should create new hero success', (() => {
    const success = new Promise((resolve) => {
      resolve('asd');
    });
    heroServiceSpy.createHero.and.returnValue(success);
    component.newHeroForm = new FormGroup({
      'name': new FormControl('new hero!', [Validators.required, Validators.maxLength(30)]),
      'alterEgo': new FormControl('haha', [Validators.required, Validators.maxLength(30)])
    });

    component.error = null;
    component.createNewHero();
    expect(component.error).toBe(null);
  }));

  it('should create new hero error', (async () => {
    const error = new Promise((resolve, reject) => {
      reject();
    });
    heroServiceSpy.createHero.and.returnValue(error);
    component.newHeroForm = new FormGroup({
      'name': new FormControl('new hero!', [Validators.required, Validators.maxLength(30)]),
      'alterEgo': new FormControl('haha', [Validators.required, Validators.maxLength(30)])
    });

    component.error = false;
    await component.createNewHero();
    expect(component.error).toBe(true);
  }));

  it('should like a hero', (() => {
    const hero = new Hero({likes: 0});
    component.like(hero);
    expect(hero.likes).toBe(1);
  }));

  it('should delete a hero', (() => {
    const hero = new Hero({id: 'testId'});
    matDialogSpy.open.and.returnValue({
      afterClosed: () => {
        return of(true);
      }
    });
    heroServiceSpy.deleteHero.and.returnValue(new Promise(() => true));
    component.deleteHero(hero);
    expect(heroServiceSpy.deleteHero).toHaveBeenCalledWith('testId');
  }));
});
