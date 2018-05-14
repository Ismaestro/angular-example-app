import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {APP_CONFIG, AppConfig} from './config/app.config';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/modules/shared.module';
import {CoreModule} from './core/core.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from './app.translate.factory';
import {HeroTopComponent} from './heroes/hero-top/hero-top.component';
import {ProgressBarService} from './core/shared/progress-bar.service';
import {ProgressInterceptor} from './shared/interceptors/progress.interceptor';
import {TimingInterceptor} from './shared/interceptors/timing.interceptor';
import {AngularExampleLibraryModule} from 'angular-example-library';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule.forRoot(),
    AngularExampleLibraryModule.forRoot({
      config: {
        say: 'hello'
      }
    }),
    CoreModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HeroTopComponent
  ],
  providers: [
    {provide: APP_CONFIG, useValue: AppConfig},
    {provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true, deps: [ProgressBarService]},
    {provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
