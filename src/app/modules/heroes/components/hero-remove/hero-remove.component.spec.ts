import {HeroRemoveComponent} from './hero-remove.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {configureTestSuite} from 'ng-bullet';
import {MockModule} from 'ng-mocks';
import {MatDialogModule} from '@angular/material';

describe('HeroRemoveComponent', () => {
  let component: HeroRemoveComponent;
  let fixture: ComponentFixture<HeroRemoveComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule(MatDialogModule)
      ],
      declarations: [
        HeroRemoveComponent
      ]
    });

    fixture = TestBed.createComponent(HeroRemoveComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', (() => {
    expect(component).toBeTruthy();
  }));
});
