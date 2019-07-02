import {NgModule} from '@angular/core';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

export function getRequest(): any {
  return {headers: {cookie: document.cookie}};
}

@NgModule({
  imports: [
    AppModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    {
      provide: REQUEST,
      useFactory: getRequest
    },
    {provide: 'ORIGIN_URL', useValue: location.origin},
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppBrowserModule {
}
