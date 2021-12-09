import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Error404PageComponent } from './error404-page.component';

describe('Error404Page', () => {
  let component: Error404PageComponent;
  let fixture: ComponentFixture<Error404PageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        Error404PageComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Error404PageComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  it('should create nav component', (() => {
    expect(component).toBeTruthy();
  }));
});
