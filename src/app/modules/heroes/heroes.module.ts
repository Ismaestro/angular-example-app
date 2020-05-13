import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroRoutingModule } from './heroes-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HeroRemoveComponent } from './components/hero-remove/hero-remove.component';
import { HeroesListPageComponent } from './pages/heroes-list-page/heroes-list-page.component';
import { HeroDetailPageComponent } from './pages/hero-detail-page/hero-detail-page.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HeroRoutingModule
  ],
  declarations: [
    HeroesListPageComponent,
    HeroDetailPageComponent,
    HeroRemoveComponent
  ],
  entryComponents: [
    HeroRemoveComponent
  ]
})

export class HeroesModule {
}
