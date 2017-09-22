import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HeroRoutingModule} from './heroes-routing.module';
import {SharedModule} from '../shared/modules/shared.module';

import {HeroListComponent, RemoveHeroDialogComponent} from './hero-list/hero-list.component';
import {HeroService} from './shared/hero.service';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroesComponent} from './heroes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    HeroRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeroesComponent,
    HeroListComponent,
    RemoveHeroDialogComponent,
    HeroDetailComponent
  ],
  entryComponents: [
    RemoveHeroDialogComponent
  ],
  providers: [
    HeroService
  ]
})

export class HeroesModule {
}
