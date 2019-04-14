import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroLoadingComponent} from './hero-loading.component';
import {configureTestSuite} from 'ng-bullet';
import {LoadingPlaceholderComponent} from '../loading-placeholder/loading-placeholder.component';
import {MockComponent} from 'ng-mocks';
import {MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle, MatIcon} from '@angular/material';

describe('HeroLoadingComponent', () => {
  let component: HeroLoadingComponent;
  let fixture: ComponentFixture<HeroLoadingComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        MockComponent(MatCard),
        MockComponent(MatCardHeader),
        MockComponent(MatCardTitle),
        MockComponent(MatCardSubtitle),
        MockComponent(MatIcon),
        MockComponent(LoadingPlaceholderComponent),
        HeroLoadingComponent
      ]
    });

    fixture = TestBed.createComponent(HeroLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
