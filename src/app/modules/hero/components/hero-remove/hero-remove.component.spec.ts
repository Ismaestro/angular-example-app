import { HeroRemoveComponent } from './hero-remove.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('HeroRemoveComponent', () => {
  let component: HeroRemoveComponent;
  let fixture: ComponentFixture<HeroRemoveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      declarations: [
        HeroRemoveComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroRemoveComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', (() => {
    expect(component).toBeTruthy();
  }));
});
