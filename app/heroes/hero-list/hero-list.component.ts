import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { APP_CONFIG, IAppConfig } from './../../app.config';
import { Hero } from './../shared/hero.model';
import { HeroService } from './../shared/hero.service';

@Component({
    moduleId: module.id,
    selector: 'toh-hero-list',
    templateUrl: 'hero-list.component.html',
    styleUrls: [ 'hero-list.component.css' ]
})

export class HeroListComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;
    
    constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig,
                private router: Router,
                private heroService: HeroService) {
    }
    
    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }
    
    ngOnInit(): void {
        this.getHeroes();
    }
    
    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }
    
    gotoDetail(): void {
        this.router.navigate([ `/${this.appConfig.routes.heroes}/`, this.selectedHero.id ]);
    }
    
    add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.create(name)
            .then(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    }
    
    remove(hero: Hero): void {
        this.heroService
            .remove(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) {
                    this.selectedHero = null;
                }
            });
    }
}
