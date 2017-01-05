import { Component, Input } from '@angular/core';

import { Hero } from './../shared/hero.model';

import { HeroService } from './../shared/hero.service';

@Component({
    moduleId: module.id,
    selector: 'toh-hero-form',
    templateUrl: 'hero-form.component.html',
    styleUrls: [ 'hero-form.component.css' ]
})

export class HeroFormComponent {
    @Input() heroes: Hero[];
    @Input() selectedHero: Hero;
    
    hero: Hero;
    submitted: boolean;
    powers: string[];
    
    constructor(private heroService: HeroService) {
        this.hero = new Hero(-1, '', '');
        this.submitted = false;

        this.heroService.getHeroesPowers().then(powers => this.powers = powers);
    }

    onSubmit() {
        this.heroService.create(this.hero)
            .then(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
                this.submitted = true;
            });
    }
}
