import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { CookieBackendService, CookieService } from '@gorniv/ngx-universal';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    FlexLayoutServerModule,
    ServerTransferStateModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    { provide: CookieService, useClass: CookieBackendService }
  ]
})
export class AppServerModule {
}
