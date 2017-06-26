import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Http} from '@angular/http';
import {TranslateLoader, TranslateModule} from 'ng2-translate';
import {TranslateLoaderFactory} from '../app.translate.factory';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {LoggerService} from './logger.service';

import {HeroesModule} from '../heroes/heroes.module';
import {HeroRoutingModule} from '../heroes/heroes-routing.module';

import {NavComponent} from './nav/nav.component';
import {FooterComponent} from './footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeroRoutingModule,
    HeroesModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: TranslateLoaderFactory,
      deps: [Http]
    }),
  ],
  exports: [
    NavComponent,
    FooterComponent
  ],
  declarations: [
    NavComponent,
    FooterComponent
  ],
  providers: [
    LoggerService
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
