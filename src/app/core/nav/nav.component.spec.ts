import {async, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {AppModule} from '../../app.module';
import {NavComponent} from './nav.component';

describe('NavComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create nav component', (() => {
    expect(component).toBeTruthy();
  }));
});
