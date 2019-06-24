import {NgModule} from '@angular/core';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {AppModule} from './app.module';
import {AppComponent} from './app.component';

export function getRequest(): any {
  return {headers: {cookie: document.cookie}};
}

@NgModule({
  imports: [
    AppModule
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
