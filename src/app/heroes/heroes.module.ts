import {NgModule}                         from '@angular/core';
import {CommonModule}                     from '@angular/common';
import {FormsModule}                      from '@angular/forms';
import {Http}                             from '@angular/http';
import {TranslateModule, TranslateLoader} from 'ng2-translate';
import {TranslateLoaderFactory}           from '../app.translate.factory';

import {HeroRoutingModule} from './heroes-routing.module';
import {SharedModule}      from '../shared/shared.module';

import {HeroListComponent}   from './hero-list/hero-list.component';
import {HeroSearchComponent} from './hero-search/hero-search.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroFormComponent}   from './hero-create-new/hero-create-new.component';

import {HeroService} from './shared/hero.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: TranslateLoaderFactory,
      deps: [Http]
    }),
    SharedModule,
    HeroRoutingModule
  ],
  declarations: [
    HeroListComponent,
    HeroSearchComponent,
    HeroDetailComponent,
    HeroFormComponent
  ],
  providers: [
    HeroService
  ],
  exports: [
    HeroSearchComponent
  ]
})

export class HeroesModule {
}
