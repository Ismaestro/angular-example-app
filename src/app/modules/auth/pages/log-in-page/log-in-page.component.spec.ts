import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LogInPageComponent } from './sign-up-page.component';

describe('SignUpPageComponent', () => {
  let component: LogInPageComponent;
  let fixture: ComponentFixture<LogInPageComponent>;

  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      NoopAnimationsModule
    ],
    declarations: [
      LogInPageComponent
    ],
    providers: []
  }).compileComponents();

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInPageComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', (() => {
    expect(component).toBeTruthy();
  }));
});
