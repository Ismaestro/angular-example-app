import {NgModule} from '@angular/core';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {AppComponent} from './app.component';
import {PrebootModule} from 'preboot';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './modules/core/core.module';
import {SharedModule} from './shared/shared.module';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {registerLocaleData} from '@angular/common';
import {WINDOW_PROVIDERS} from './modules/core/services/window.service';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {Error404PageComponent} from './pages/error404-page/error404-page.component';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

// the Request object only lives on the server
export function getRequest(): any {
  return {headers: {cookie: document.cookie}};
}

@NgModule({
  imports: [
    PrebootModule.withConfig({appRoot: 'app-root'}),
    TransferHttpCacheModule,
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
    WINDOW_PROVIDERS,
    {
      // The server provides these in main.server
      provide: REQUEST,
      useFactory: getRequest,
    }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppBrowserModule {
}
