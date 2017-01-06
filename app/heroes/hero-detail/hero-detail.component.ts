import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Hero }         from './../shared/hero.model';
import { HeroService }  from './../shared/hero.service';

@Component({
    moduleId: module.id,
    selector: 'toh-hero-detail',
    templateUrl: 'hero-detail.component.html',
    styleUrls: [ 'hero-detail.component.css' ]
})

export class HeroDetailComponent implements OnInit {
    hero: Hero;

    constructor(private heroService: HeroService,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.heroService.getHeroById(+params[ 'id' ]))
            .subscribe(hero => this.hero = hero);
    }

    saveHero(): void {
        this.heroService.update(this.hero)
            .then(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}
