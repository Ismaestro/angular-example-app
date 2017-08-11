import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HeroListComponent} from './hero-list/hero-list.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroesComponent} from './heroes.component';

const heroesRoutes: Routes = [
  {
    path: '',
    component: HeroesComponent,
    children: [
      {path: '', component: HeroListComponent},
      {path: ':id', component: HeroDetailComponent}
    ]
  }
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
