import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { NgxExampleLibraryComponent } from '@ismaestro/ngx-example-library';
import { MockComponent } from 'ng-mocks';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MockComponent(NgxExampleLibraryComponent), FooterComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(FooterComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create footer component', () => {
    expect(component).toBeTruthy();
  });
});
