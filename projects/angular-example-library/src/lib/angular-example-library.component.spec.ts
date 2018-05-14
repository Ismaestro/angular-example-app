import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularExampleLibraryComponent} from './angular-example-library.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('AngularExampleLibraryComponent', () => {
  let component: AngularExampleLibraryComponent;
  let fixture: ComponentFixture<AngularExampleLibraryComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AngularExampleLibraryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularExampleLibraryComponent);
    component = fixture.componentInstance;
    component.locale = 'es';

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('span'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exists <span> text', () => {
    fixture.detectChanges();
    const span = de.nativeElement;
    expect(span.innerText).toBeDefined();
  });
});
