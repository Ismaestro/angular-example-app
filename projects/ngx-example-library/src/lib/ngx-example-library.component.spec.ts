import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxExampleLibraryComponent } from './ngx-example-library.component';

describe('NgxExampleLibraryComponent', () => {
  let component: NgxExampleLibraryComponent;
  let fixture: ComponentFixture<NgxExampleLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxExampleLibraryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxExampleLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
