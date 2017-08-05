import {Component, Inject, OnInit} from '@angular/core';

import {Hero} from '../shared/hero.model';

import {HeroService} from '../shared/hero.service';
import {APP_CONFIG} from '../../config/app.config';
import {IAppConfig} from '../../config/iapp.config';

@Component({
  selector: 'toh-hero-top',
  templateUrl: './hero-top.component.html',
  styleUrls: ['./hero-top.component.scss']
})
export class HeroTopComponent implements OnInit {

  heroes: Hero[] = null;
  canVote = false;

  constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig,
              private heroService: HeroService) {
    this.canVote = this.heroService.checkIfUserCanVote();
  }

  ngOnInit(): void {
    this.heroService.getAllHeroes().subscribe((heroes) => {
      this.heroes = heroes.sort((a, b) => {
        return b.likes - a.likes;
      }).slice(0, this.appConfig.topHeroesLimit);
    });
  }

  like(hero) {
    this.heroService.like(hero).subscribe(() => {
      this.canVote = this.heroService.checkIfUserCanVote();
    });
  }
}
