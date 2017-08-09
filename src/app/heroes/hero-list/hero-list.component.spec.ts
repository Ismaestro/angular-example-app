import {async, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {AppModule} from '../../app.module';
import {HeroListComponent} from './hero-list.component';
import {HeroesModule} from '../heroes.module';

describe('HeroListComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        HeroesModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create hero list component', (() => {
    expect(component).toBeTruthy();
    component.seeHeroDetails({'id': 1, 'default': true})
  }));
});
