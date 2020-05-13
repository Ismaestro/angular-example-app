import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingPlaceholderComponent } from './loading-placeholder.component';
import { configureTestSuite } from 'ng-bullet';

describe('LoadingPlaceholderComponent', () => {
  let component: LoadingPlaceholderComponent;
  let fixture: ComponentFixture<LoadingPlaceholderComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoadingPlaceholderComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
