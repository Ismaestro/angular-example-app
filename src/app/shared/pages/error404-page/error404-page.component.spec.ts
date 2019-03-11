import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TestsModule} from '../../modules/tests.module';
import {ProgressBarService} from '../../../core/services/progress-bar.service';
import {Error404PageComponent} from './error404-page.component';
import {configureTestSuite} from 'ng-bullet';

describe('Error404Page', () => {
  let component: Error404PageComponent;
  let fixture: ComponentFixture<Error404PageComponent>;
  let progressBarService: ProgressBarService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule
      ],
      declarations: [
        Error404PageComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Error404PageComponent);
    component = fixture.debugElement.componentInstance;
    progressBarService = TestBed.get(ProgressBarService);
  });

  it('should create nav component', (() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));
});
