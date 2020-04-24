import {NgModule} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {AppComponent} from './app.component';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import {AppBrowserModule} from './app.browser.module';
import {CookieBackendService, CookieService} from '@gorniv/ngx-universal';
import {FlexLayoutServerModule} from '@angular/flex-layout/server';

@NgModule({
  imports: [
    AppBrowserModule,
    FlexLayoutServerModule,
    ServerModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    {provide: CookieService, useClass: CookieBackendService}
  ]
})
export class AppServerModule {
}
