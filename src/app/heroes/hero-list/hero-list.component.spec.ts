import {async, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {AppModule} from '../../app.module';
import {HeroListComponent} from './hero-list.component';

describe('HeroListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
    }).compileComponents();
  }));

  it('should create hero list component', (() => {
    const fixture = TestBed.createComponent(HeroListComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
    component.seeHeroDetails({'id': 1, 'default': true})
  }));
});
