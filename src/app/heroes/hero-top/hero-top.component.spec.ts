import {async, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {AppModule} from '../../app.module';
import {HeroTopComponent} from './hero-top.component';
import {HeroesModule} from '../heroes.module';

describe('HeroTopComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroTopComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create hero top component', (() => {
    expect(component).toBeTruthy();
  }));
});
