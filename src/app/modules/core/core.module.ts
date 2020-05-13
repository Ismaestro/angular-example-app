import { ErrorHandler, LOCALE_ID, NgModule, Optional, SkipSelf, TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
import { TimingInterceptor } from './interceptors/timing.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgressInterceptor } from './interceptors/progress.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ProgressBarService } from './services/progress-bar.service';
import { CookieModule, CookieService } from '@gorniv/ngx-universal';
import { FirebaseModule } from '../../shared/modules/firebase.module';
import { NgxExampleLibraryModule } from '@ismaestro/ngx-example-library';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { APP_CONFIG, AppConfig } from '../../configs/app.config';
import { ROUTES_CONFIG, RoutesConfig } from '../../configs/routes.config';
import { ENDPOINTS_CONFIG, EndpointsConfig } from '../../configs/endpoints.config';
import { SentryErrorHandler } from './sentry.errorhandler';
import { I18n } from '@ngx-translate/i18n-polyfill';

declare const require;

@NgModule({
  imports: [
    RouterModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    FirebaseModule,
    NgxExampleLibraryModule.forRoot({
      config: {
        say: 'hello'
      }
    }),
    LazyLoadImageModule.forRoot({})
  ],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig },
    { provide: ROUTES_CONFIG, useValue: RoutesConfig },
    { provide: ENDPOINTS_CONFIG, useValue: EndpointsConfig },
    { provide: ErrorHandler, useClass: SentryErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true, deps: [ProgressBarService] },
    { provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true },
    { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
    {
      provide: TRANSLATIONS,
      useFactory: (locale) => {
        const defaultLocale = 'en';
        locale = (locale && ['es'].includes(locale)) ? locale : 'en';
        const messagesUrl = (locale === defaultLocale) ? `messages.xlf` : `messages.${locale}.xlf`;
        return require(`raw-loader!../../../locale/${messagesUrl}`).default;
      },
      deps: [LOCALE_ID]
    },
    I18n,
    CookieService
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
