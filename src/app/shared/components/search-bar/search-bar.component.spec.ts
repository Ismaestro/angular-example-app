import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { Hero } from '../../../modules/heroes/shared/hero.model';
import { of } from 'rxjs';
import { configureTestSuite } from 'ng-bullet';
import { MockPipe } from 'ng-mocks';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';
import { ROUTES_CONFIG, RoutesConfig } from '../../../configs/routes.config';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeroService } from '../../../modules/core/services/hero.service';
import { MatInputModule } from '@angular/material/input';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [MockPipe(CapitalizeFirstPipe), SearchBarComponent],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: ROUTES_CONFIG, useValue: RoutesConfig },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.debugElement.componentInstance;
    heroServiceSpy.getHeroes.and.returnValue(of([new Hero({ name: 'test1', default: true })]));
    fixture.detectChanges();
  });

  it('should create hero search component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter heroes array', () => {
    component.defaultHeroes = [
      new Hero({ id: 1, name: 'batman', default: true }),
      new Hero({ id: 2, name: 'spiderman', default: false }),
    ];
    expect(component.filterHeroes('batman').length).toBe(1);
    expect(component.filterHeroes('spiderman').length).toBe(0);
    expect(component.filterHeroes('').length).toBe(2);
  });
});
