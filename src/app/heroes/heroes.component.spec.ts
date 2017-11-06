import {async, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {HeroesComponent} from './heroes.component';
import {HeroesModule} from './heroes.module';
import {TestsModule} from '../shared/modules/tests.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('HeroesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        HeroesModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create heroes component', (() => {
    const fixture = TestBed.createComponent(HeroesComponent);
    fixture.detectChanges();
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));
});
