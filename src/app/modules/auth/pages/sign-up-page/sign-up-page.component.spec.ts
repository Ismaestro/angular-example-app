import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpPageComponent } from './sign-up-page.component';
import { MockModule } from 'ng-mocks';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('SignUpPageComponent', () => {
  let component: SignUpPageComponent;
  let fixture: ComponentFixture<SignUpPageComponent>;
  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule(MaterialModule),
        RouterTestingModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [
        SignUpPageComponent
      ],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBarSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpPageComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  it('should create component', (() => {
    expect(component).toBeTruthy();
  }));
});
