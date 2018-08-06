import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {APP_BASE_HREF} from '@angular/common';
import {TestsModule} from './shared/modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {AppRoutingModule} from './app-routing.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {APP_CONFIG, AppConfig} from './config/app.config';
import {HeroService} from './modules/heroes/shared/hero.service';
import {CoreModule} from './core/core.module';

describe('AppComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
        CoreModule,
        AppRoutingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        HeroService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
  }));

  it('should create the app', (() => {
    expect(component).toBeTruthy();
  }));

  it('should change title meta tag in root path', async(() => {
    fixture.detectChanges();
    expect(component.title.getTitle()).toBe('Angular Example App');
  }));

  it('should check browser features', (() => {
    expect(component.checkBrowserFeatures()).toBeTruthy();
  }));
});
