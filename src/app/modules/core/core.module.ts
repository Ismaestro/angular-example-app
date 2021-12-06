import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { TimingInterceptor } from './interceptors/timing.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CookieModule, CookieService } from '@gorniv/ngx-universal';
import { NgxExampleLibraryModule } from '@ismaestro/ngx-example-library';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { APP_CONFIG, AppConfig } from '../../configs/app.config';
import { ROUTES_CONFIG, RoutesConfig } from '../../configs/routes.config';
import { ENDPOINTS_CONFIG, EndpointsConfig } from '../../configs/endpoints.config';
import { SentryErrorHandler } from './sentry.errorhandler';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  imports: [
    RouterModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    NgxExampleLibraryModule.forRoot({
      config: {
        say: 'hello'
      }
    }),
    LazyLoadImageModule
  ],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig },
    { provide: ROUTES_CONFIG, useValue: RoutesConfig },
    { provide: ENDPOINTS_CONFIG, useValue: EndpointsConfig },
    { provide: ErrorHandler, useClass: SentryErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true, deps: [CookieService] },
    { provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true },
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
