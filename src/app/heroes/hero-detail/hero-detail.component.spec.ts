import {async, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroesModule} from '../heroes.module';
import {TestsModule} from '../../shared/modules/tests.module';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {TranslateModule} from '@ngx-translate/core';
import {HeroService} from '../shared/hero.service';

describe('HeroDetailComponent', () => {
  let fixture;
  let component;
  let heroService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
        HeroesModule
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        HeroService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    heroService = TestBed.get(HeroService);
  }));

  it('should create hero detail component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should like a hero', async(() => {
    localStorage.setItem('votes', String(AppConfig.votesLimit - 1));
    component.like({id: 1}).then((result) => {
      expect(result).toBe(true);
    });
  }));
});
