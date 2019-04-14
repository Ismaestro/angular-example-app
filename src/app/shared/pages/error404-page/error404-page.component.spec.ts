import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Error404PageComponent} from './error404-page.component';
import {configureTestSuite} from 'ng-bullet';

describe('Error404Page', () => {
  let component: Error404PageComponent;
  let fixture: ComponentFixture<Error404PageComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        Error404PageComponent
      ]
    });

    fixture = TestBed.createComponent(Error404PageComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create nav component', (() => {
    expect(component).toBeTruthy();
  }));
});
