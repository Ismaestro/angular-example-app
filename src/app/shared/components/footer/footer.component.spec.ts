import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FooterComponent} from './footer.component';
import {configureTestSuite} from 'ng-bullet';
import {NgxExampleLibraryComponent} from '@ismaestro/ngx-example-library';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxExampleLibraryComponent,
        FooterComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create footer component', (() => {
    expect(component).toBeTruthy();
  }));
});
