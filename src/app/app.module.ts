import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { APP_CONFIG, AppConfig } from './app.config';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule }       from './core/core.module';
import { HeroesModule }     from './heroes/heroes.module';


import { AppComponent }     from './app.component';
import { HeroTopComponent } from './heroes/hero-top/hero-top.component';

import './shared/rxjs-extensions';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        CoreModule,
        HeroesModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
        HeroTopComponent
    ],
    providers: [
        { provide: APP_CONFIG, useValue: AppConfig }
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {
}
