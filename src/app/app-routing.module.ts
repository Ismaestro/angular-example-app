import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConfig } from './configs/routes.config';

const routes: Routes = [
  { path: RoutesConfig.basePaths.auth, loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: RoutesConfig.basePaths.hero, loadChildren: () => import('./modules/hero/hero.module').then(m => m.HeroModule) },
  { path: '**', redirectTo: RoutesConfig.routes.error404 }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
