import {ErrorHandler, LOCALE_ID, NgModule, TRANSLATIONS} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './modules/core/core.module';
import {AppComponent} from './app.component';
import {APP_CONFIG, AppConfig} from './configs/app.config';
import {SharedModule} from './shared/shared.module';
import {NgxExampleLibraryModule} from '@ismaestro/ngx-example-library';
import {FirebaseModule} from './shared/modules/firebase.module';
import {SentryErrorHandler} from './modules/core/sentry.errorhandler';
import {BrowserModule} from '@angular/platform-browser';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {NgxProgressiveImageLoaderModule} from 'ngx-progressive-image-loader';
import {CookieModule} from 'ngx-cookie';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {ROUTES_CONFIG, RoutesConfig} from './configs/routes.config';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {Error404PageComponent} from './pages/error404-page/error404-page.component';
import {ENDPOINTS_CONFIG, EndpointsConfig} from './configs/endpoints.config';

declare const require;

registerLocaleData(localeEs, 'es');

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'angularexampleapp'}),
    TransferHttpCacheModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    HttpClientModule,
    FirebaseModule,
    NgxExampleLibraryModule.forRoot({
      config: {
        say: 'hello'
      }
    }),
    NgxProgressiveImageLoaderModule.forRoot(),
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    HomePageComponent,
    Error404PageComponent,
    AppComponent
  ],
  providers: [
    {provide: APP_CONFIG, useValue: AppConfig},
    {provide: ROUTES_CONFIG, useValue: RoutesConfig},
    {provide: ENDPOINTS_CONFIG, useValue: EndpointsConfig},
    {provide: ErrorHandler, useClass: SentryErrorHandler},
    {
      provide: TRANSLATIONS,
      useFactory: (locale) => {
        locale = locale || 'en';
        return require(`raw-loader!../i18n/messages.${locale}.xlf`);
      },
      deps: [LOCALE_ID]
    },
    I18n
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppBrowserModule {
}
