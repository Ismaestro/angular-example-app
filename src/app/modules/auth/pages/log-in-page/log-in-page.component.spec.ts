import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LogInPageComponent } from './log-in-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { MockModule } from 'ng-mocks';

describe('SignUpPageComponent', () => {
  let component: LogInPageComponent;
  let fixture: ComponentFixture<LogInPageComponent>;
  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          MockModule(MaterialModule),
          RouterTestingModule,
          NoopAnimationsModule,
          ReactiveFormsModule,
        ],
        declarations: [LogInPageComponent],
        providers: [{ provide: MatSnackBar, useValue: matSnackBarSpy }],
      }).compileComponents();

      fixture = TestBed.createComponent(LogInPageComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
