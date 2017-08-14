import {Component} from '@angular/core';

import {Hero} from '../shared/hero.model';

import {HeroService} from '../shared/hero.service';
import {AppConfig} from '../../config/app.config';

@Component({
  selector: 'app-hero-top',
  templateUrl: './hero-top.component.html',
  styleUrls: ['./hero-top.component.scss']
})
export class HeroTopComponent {

  heroes: Hero[] = null;
  canVote = false;

  constructor(private heroService: HeroService) {
    this.canVote = this.heroService.checkIfUserCanVote();

    this.heroService.getAllHeroes().subscribe((heroes) => {
      this.heroes = heroes.sort((a, b) => {
        return b.likes - a.likes;
      }).slice(0, AppConfig.topHeroesLimit);
    });
  }

  like(hero: Hero): Promise<any> {
    return new Promise((resolve, reject) => {
      this.heroService.like(hero).subscribe(() => {
        this.canVote = this.heroService.checkIfUserCanVote();
        resolve(true);
      }, (error) => {
        reject(error);
      });
    });
  }
}
