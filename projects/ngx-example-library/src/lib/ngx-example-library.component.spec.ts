import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NgxExampleLibraryComponent} from './ngx-example-library.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {configureTestSuite} from 'ng-bullet';

describe('NgxExampleLibraryComponent', () => {
  let component: NgxExampleLibraryComponent;
  let fixture: ComponentFixture<NgxExampleLibraryComponent>;
  let debugElement: DebugElement;
  let nativeElement: HTMLElement;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxExampleLibraryComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxExampleLibraryComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.css('span'));
    nativeElement = debugElement.nativeElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should exists <span> text', () => {
    fixture.detectChanges();
    const span = debugElement.nativeElement;
    expect(span.innerText).toBeDefined();
  });
});
