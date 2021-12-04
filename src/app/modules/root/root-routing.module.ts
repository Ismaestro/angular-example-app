import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RoutesConfig } from '../../configs/routes.config';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';

const routesNames = RoutesConfig.routesNames;

const rootRoutes: Routes = [
  { path: routesNames.home, component: HomePageComponent, pathMatch: 'full' },
  { path: routesNames.error404, component: Error404PageComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(rootRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class RootRoutingModule {
}
