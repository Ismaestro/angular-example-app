import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {APP_CONFIG} from '../../config/app.config';
import {IAppConfig} from '../../config/iapp.config';

import {Hero} from '../shared/hero.model';
import {HeroService} from '../shared/hero.service';
declare const $: any;

@Component({
  selector: 'toh-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})

export class HeroListComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  heroToRemove: Hero;
  color: string;
  createNewHero: boolean;
  error: string;

  constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig,
              private router: Router,
              private heroService: HeroService) {
    this.heroService.refreshHeroes$.subscribe(heroes => this.heroes = heroes);
  }

  getHeroes(): void {
    this.heroService.getHeroes().then((heroes) => {
      this.heroes = heroes;
      localStorage.setItem('heroes', JSON.stringify(heroes));
    });
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate([`/${this.appConfig.routes.heroes}/`, this.selectedHero.id]);
  }

  remove(): void {
    $('#askForRemove').modal('hide');
    this.heroService
      .remove(this.heroToRemove.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== this.heroToRemove);
        if (this.selectedHero === this.heroToRemove) {
          this.selectedHero = null;
        }
      }, (response) => {
        if (response.status === 500) {
          this.error = 'heroDefault';
        }
      });
  }

  showRemoveModal(hero: Hero): void {
    this.heroToRemove = hero;
    $('#askForRemove').modal('show');
  }
}
