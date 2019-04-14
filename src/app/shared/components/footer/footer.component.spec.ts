import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FooterComponent} from './footer.component';
import {configureTestSuite} from 'ng-bullet';
import {NgxExampleLibraryComponent} from '@ismaestro/ngx-example-library';
import {MockComponent} from 'ng-mocks';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent(NgxExampleLibraryComponent),
        FooterComponent
      ]
    });

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create footer component', (() => {
    expect(component).toBeTruthy();
  }));
});
