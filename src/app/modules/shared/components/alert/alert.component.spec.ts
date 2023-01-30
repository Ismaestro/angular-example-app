import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from '~modules/shared/components/alert/alert.component';
import { of } from 'rxjs';
import { AlertService } from '~modules/shared/services/alert.service';

// eslint-disable-next-line max-lines-per-function
describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  const alertServiceSpy = jasmine.createSpyObj('AlertService', {
    decodeToken: { exp: 167498413 },
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent],
      providers: [
        {
          provide: AlertService,
          useValue: {
            ...alertServiceSpy,
            events$: of({
              type: '',
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.alerts).toEqual([]);
  });
});
