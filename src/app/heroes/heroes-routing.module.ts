import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppConfig} from '../config/app.config';

import {HeroListComponent} from './hero-list/hero-list.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';

const heroesRoutes: Routes = [
  {path: AppConfig.routes.heroes, component: HeroListComponent},
  {path: AppConfig.routes.heroById, component: HeroDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class HeroRoutingModule {
}
