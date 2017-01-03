import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {HeroListComponent} from './hero-list/hero-list.component';
import {HeroSearchComponent} from './hero-search/hero-search.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';

import {HeroRoutingModule} from './heroes-routing.module';
import {HeroService} from './shared/hero.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HeroRoutingModule
    ],
    declarations: [
        HeroListComponent,
        HeroSearchComponent,
        HeroDetailComponent
    ],
    providers: [
        HeroService
    ],
    exports: [
        HeroSearchComponent
    ]
})

export class HeroesModule {
}
