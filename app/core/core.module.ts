import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {LoggerService} from './logger.service';
import {NavComponent} from './nav/nav.component';

import {HeroesModule}     from './../heroes/heroes.module';
import {HeroRoutingModule} from './../heroes/heroes-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HeroRoutingModule,
        HeroesModule
    ],
    exports: [
        NavComponent
    ],
    declarations: [
        NavComponent
    ],
    providers: [
        LoggerService
    ]
})

export class CoreModule {
}
