import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SpinnerComponent} from './spinner.component';
import {configureTestSuite} from 'ng-bullet';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        SpinnerComponent
      ]
    });

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
