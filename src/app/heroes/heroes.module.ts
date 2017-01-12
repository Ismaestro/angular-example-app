import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}  from '@angular/forms';

import {HeroRoutingModule} from './heroes-routing.module';
import {SharedModule} from '../shared/shared.module';

import {HeroListComponent}   from './hero-list/hero-list.component';
import {HeroSearchComponent} from './hero-search/hero-search.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroFormComponent}   from './hero-form/hero-form.component';

import {HeroService} from './shared/hero.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
