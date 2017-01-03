import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {throwIfAlreadyLoaded} from './module-import-guard';

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
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
