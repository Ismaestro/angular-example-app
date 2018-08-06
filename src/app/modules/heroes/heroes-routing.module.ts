import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroDetailPage} from './pages/hero-detail/hero-detail.page';
import {HeroesListPage} from './pages/heroes-list/heroes-list.page';

const heroesRoutes: Routes = [
  {path: '', component: HeroesListPage},
  {path: ':id', component: HeroDetailPage}
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
