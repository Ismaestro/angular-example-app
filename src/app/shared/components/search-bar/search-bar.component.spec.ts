import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchBarComponent} from './search-bar.component';
import {HeroService} from '../../../modules/heroes/shared/hero.service';
import {Router} from '@angular/router';
import {Hero} from '../../../modules/heroes/shared/hero.model';
import {of} from 'rxjs';
import {configureTestSuite} from 'ng-bullet';
import {MockComponent, MockModule} from 'ng-mocks';
import {MatAutocompleteModule, MatFormField} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let router: Router;
  let navigateSpy;
  const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MockModule(MatAutocompleteModule)
      ],
      declarations: [
        MockComponent(MatFormField),
        SearchBarComponent
      ],
      providers: [
        {provide: HeroService, useValue: heroServiceSpy}
      ]
    });

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.get(Router);
    navigateSpy = spyOn(router, 'navigate');
    heroServiceSpy.getHeroes.and.returnValue(of([new Hero({name: 'test1', default: true})]));
    fixture.detectChanges();
  });

  it('should create hero search component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should filter heroes array', (() => {
    component.defaultHeroes = [
      new Hero({'id': 1, 'name': 'batman', 'default': true}),
      new Hero({'id': 2, 'name': 'spiderman', 'default': false})
    ];
    expect(component.filterHeroes('batman').length).toBe(1);
    expect(component.filterHeroes('spiderman').length).toBe(0);
    expect(component.filterHeroes('').length).toBe(2);
  }));

  it('should navigate to hero detail', (() => {
    const heroId = 'BzTvl77YsRTtdihH0jeh';
    component.searchHero(new Hero({id: heroId}));
    expect(navigateSpy).toHaveBeenCalledWith(['heroes/' + heroId]);
  }));
});
