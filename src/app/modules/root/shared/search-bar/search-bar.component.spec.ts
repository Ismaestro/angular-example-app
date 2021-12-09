import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { Hero } from '../../../hero/shared/hero.model';
import { of } from 'rxjs';
import { MockPipe } from 'ng-mocks';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CapitalizeFirstPipe } from '../../../../shared/pipes/capitalize-first.pipe';
import { ROUTES_CONFIG, RoutesConfig } from '../../../../configs/routes.config';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeroService } from '../../../hero/shared/hero.service';
import { MatInputModule } from '@angular/material/input';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  const heroServiceSpy = jasmine.createSpyObj('HeroService', ['searchHeroes']);

  beforeEach(waitForAsync(() => {
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
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.debugElement.componentInstance;
    heroServiceSpy.searchHeroes.and.returnValue(of([new Hero({ name: 'test1', default: true })]));
    fixture.detectChanges();
  }));

  it('should create hero search component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter heroes array', () => {
    component.defaultHeroes = [
      new Hero({ id: 1, alterEgo: 'batman', published: true }),
      new Hero({ id: 2, alterEgo: 'spiderman', published: true }),
    ];
    expect(component.filterHeroes('batman').length).toBe(1);
    expect(component.filterHeroes('spider-man').length).toBe(0);
    expect(component.filterHeroes('').length).toBe(2);
  });
});
