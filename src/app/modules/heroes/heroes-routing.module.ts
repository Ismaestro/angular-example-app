import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroesListPageComponent} from './pages/heroes-list-page/heroes-list-page.component';
import {HeroDetailPageComponent} from './pages/hero-detail-page/hero-detail-page.component';

const heroesRoutes: Routes = [
  {path: '', component: HeroesListPageComponent},
  {path: ':id', component: HeroDetailPageComponent}
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
