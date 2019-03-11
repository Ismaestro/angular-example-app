import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroLoadingComponent} from './hero-loading.component';
import {TestsModule} from '../../modules/tests.module';
import {configureTestSuite} from 'ng-bullet';
import {LoadingPlaceholderComponent} from '../loading-placeholder/loading-placeholder.component';

describe('HeroLoadingComponent', () => {
  let component: HeroLoadingComponent;
  let fixture: ComponentFixture<HeroLoadingComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule
      ],
      declarations: [
        LoadingPlaceholderComponent,
        HeroLoadingComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroLoadingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
