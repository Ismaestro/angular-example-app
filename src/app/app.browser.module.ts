import { NgModule } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { AppComponent } from './app.component';
import { StateTransferInitializerModule } from '@nguniversal/common';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { AppModule } from './app.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(localeEs, 'es');

// the Request object only lives on the server
export function getRequest(): any {
  return { headers: { cookie: document.cookie } };
}

@NgModule({
  imports: [
    AppModule,
    StateTransferInitializerModule,
    BrowserTransferStateModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      // The server provides these in main.server
      provide: REQUEST,
      useFactory: getRequest
    }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppBrowserModule {
}
