import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroLoadingComponent } from './hero-loading.component';
import { configureTestSuite } from 'ng-bullet';
import { LoadingPlaceholderComponent } from '../loading-placeholder/loading-placeholder.component';
import { MockComponent } from 'ng-mocks';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('HeroLoadingComponent', () => {
  let component: HeroLoadingComponent;
  let fixture: ComponentFixture<HeroLoadingComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule
      ],
      declarations: [
        MockComponent(LoadingPlaceholderComponent),
        HeroLoadingComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
