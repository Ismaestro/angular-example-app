import {async, TestBed} from '@angular/core/testing';
import {FooterComponent} from './footer.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {configureTestSuite} from 'ng-bullet';

describe('FooterComponent', () => {
  let fixture;
  let component;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      declarations: [
        FooterComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
  });

  it('should create footer component', (() => {
    expect(component).toBeTruthy();
  }));
});
