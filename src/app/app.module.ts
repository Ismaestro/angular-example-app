import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './shared/shared.module';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { registerLocaleData } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import localeEs from '@angular/common/locales/es';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(localeEs, 'es');

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'angularexampleapp' }),
    TransferHttpCacheModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    HomePageComponent,
    Error404PageComponent,
    AppComponent
  ]
})

export class AppModule {
}
