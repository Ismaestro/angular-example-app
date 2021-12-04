import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './shared/shared.module';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RootModule } from './modules/root/root.module';

registerLocaleData(localeEs, 'es');

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'angularexampleapp' }),
    TransferHttpCacheModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    RootModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent
  ]
})

export class AppModule {
}
