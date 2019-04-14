import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {Title} from '@angular/platform-browser';
import {configureTestSuite} from 'ng-bullet';
import {NavigationEnd, Router} from '@angular/router';
import {HeaderComponent} from './shared/components/header/header.component';
import {SearchBarComponent} from './shared/components/search-bar/search-bar.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {NgxExampleLibraryComponent} from '@ismaestro/ngx-example-library';
import {of} from 'rxjs';
import {MockComponent} from 'ng-mocks';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBar} from '@angular/material';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {TRANSLATIONS, TRANSLATIONS_FORMAT} from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let titleService: Title;
  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
  const routerSpy = jasmine.createSpyObj('Router', ['events']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        MockComponent(HeaderComponent),
        MockComponent(SearchBarComponent),
        MockComponent(FooterComponent),
        MockComponent(NgxExampleLibraryComponent),
        AppComponent
      ],
      providers: [
        {provide: MatSnackBar, useValue: matSnackBarSpy},
        {provide: TRANSLATIONS, useValue: require(`raw-loader!./../i18n/messages.en.xlf`)},
        {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
        I18n
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    titleService = TestBed.get(Title);
    routerSpy.events.and.returnValue(of(new NavigationEnd(1, '', '/')));
    fixture.detectChanges();
  });

  it('should create the app', (() => {
    expect(component).toBeTruthy();
  }));

  it('should change title meta tag in root path', (() => {
    expect(titleService.getTitle()).toBe('App title');
  }));

  it('should check browser features', (() => {
    expect(component.checkBrowserFeatures()).toBeTruthy();
  }));
});
