import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroResolver } from './shared/hero.resolver';
import { HeroDetailPageComponent } from './pages/hero-detail-page/hero-detail-page.component';
import { MyHeroesPageComponent } from './pages/my-heroes-page/my-heroes-page.component';
import { RoutesConfig } from '../../configs/routes.config';

const heroRoutes = RoutesConfig.routesNames.hero;

const heroesRoutes: Routes = [
  { path: heroRoutes.myHeroes, component: MyHeroesPageComponent},
  {
    path: heroRoutes.detail,
    component: HeroDetailPageComponent,
    resolve: { hero: HeroResolver }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    HeroResolver
  ]
})

export class HeroRoutingModule {
}
