import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TestsModule} from '../../../../shared/modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {HeroesListPageComponent} from './heroes-list-page.component';
import {configureTestSuite} from 'ng-bullet';
import {HeroLoadingComponent} from '../../../../shared/components/hero-loading/hero-loading.component';
import {LoadingPlaceholderComponent} from '../../../../shared/components/loading-placeholder/loading-placeholder.component';
import {HeroService} from '../../shared/hero.service';
import {Hero} from '../../shared/hero.model';
import {of} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';

describe('HeroesListPageComponent', () => {
  let component: HeroesListPageComponent;
  let fixture: ComponentFixture<HeroesListPageComponent>;
  let heroService: HeroService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        HeroLoadingComponent,
        LoadingPlaceholderComponent,
        HeroesListPageComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesListPageComponent);
    component = fixture.debugElement.componentInstance;
    heroService = TestBed.get(HeroService);
    spyOn(heroService, 'getHeroes').and.returnValue(of([new Hero({is: 1, name: 'hero test'})]));
  });

  it('should create component and load heroes', (() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.heroes.length).toBe(1);
    expect(component.heroes[0].name).toBe('hero test');
  }));

  it('should create new hero success', (() => {
    const success = new Promise((resolve) => {
      resolve('asd');
    });
    spyOn(heroService, 'createHero').and.returnValue(success);
    component.newHeroForm = new FormGroup({
      'name': new FormControl('new hero!', [Validators.required, Validators.maxLength(30)]),
      'alterEgo': new FormControl('haha', [Validators.required, Validators.maxLength(30)])
    });

    component.createNewHero();
    expect(component.error).toBe(undefined);
  }));

  it('should create new hero error', (async () => {
    const error = new Promise((resolve, reject) => {
      reject();
    });
    spyOn(heroService, 'createHero').and.returnValue(error);
    component.newHeroForm = new FormGroup({
      'name': new FormControl('new hero!', [Validators.required, Validators.maxLength(30)]),
      'alterEgo': new FormControl('haha', [Validators.required, Validators.maxLength(30)])
    });

    component.error = '';
    await component.createNewHero();
    expect(component.error).toBe('errorHasOcurred');
  }));
});
