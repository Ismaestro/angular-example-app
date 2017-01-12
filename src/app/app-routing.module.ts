import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HeroTopComponent} from './heroes/hero-top/hero-top.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: HeroTopComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
