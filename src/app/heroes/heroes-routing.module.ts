import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppConfig} from '../config/app.config';

import {HeroListComponent} from './hero-list/hero-list.component';

const heroesRoutes: Routes = [
  {path: AppConfig.routes.heroes, component: HeroListComponent},
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
