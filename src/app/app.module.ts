import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NgxExampleLibraryModule} from '@ismaestro/ngx-example-library';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {WebpackTranslateLoader} from './webpack-translate-loader';
import {APP_CONFIG, AppConfig} from './configs/app.config';
import {SharedModule} from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: WebpackTranslateLoader
      }
    }),
    NgxExampleLibraryModule.forRoot({
      config: {
        say: 'hello'
      }
    }),
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {provide: APP_CONFIG, useValue: AppConfig}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
