import {NgModule} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {AppBrowserModule} from './app.browser.module';
import {AppComponent} from './app.component';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import {FlexLayoutServerModule} from '@angular/flex-layout/server';
import {CookieBackendService, CookieService} from 'ngx-cookie';

@NgModule({
  imports: [
    AppBrowserModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
    FlexLayoutServerModule
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
