import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { APP_CONFIG, AppConfig } from './app.config';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule }       from './core/core.module';
import { HeroesModule }     from './heroes/heroes.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './shared/in-memory-data.service';

import { AppComponent }     from './app.component';
import { HeroTopComponent } from './heroes/hero-top/hero-top.component';

import { HighlightDirective } from "./shared/highlight.directive";

import './shared/rxjs-extensions';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        AppRoutingModule,
        CoreModule,
        HeroesModule
    ],
    declarations: [
        AppComponent,
        HeroTopComponent,
        HighlightDirective
    ],
    providers: [
        { provide: APP_CONFIG, useValue: AppConfig }
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {
}
