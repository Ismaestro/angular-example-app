import {Component, Inject, OnInit} from '@angular/core';

import {Hero} from '../shared/hero.model';

import {HeroService} from '../shared/hero.service';
import {MdSnackBar} from '@angular/material';
import {TranslateService} from 'ng2-translate';
import {APP_CONFIG} from '../../config/app.config';
import {IAppConfig} from '../../config/iapp.config';

@Component({
  selector: 'toh-hero-top',
  templateUrl: './hero-top.component.html',
  styleUrls: ['./hero-top.component.scss']
})
export class HeroTopComponent implements OnInit {

  heroes: Hero[] = null;

  constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig,
              private heroService: HeroService,
              private snackBar: MdSnackBar,
              private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.heroService.get().subscribe((heroes) => {
      this.heroes = heroes.sort((a, b) => {
        return b.likes - a.likes;
      }).slice(0, this.appConfig.topHeroesLimit);
    });
  }

  like(hero) {
    this.translateService.get(['saved', 'heroLikeMaximum'], {'value': this.appConfig.votesLimit}).subscribe(
      (texts) => {
        if (Number(localStorage.getItem('votes')) < this.appConfig.votesLimit) {
          this.heroService.like(hero.id).subscribe(() => {
            hero.likes += 1;
            this.snackBar.open(texts['saved'], 'OK', {
              duration: this.appConfig.snackBarDuration,
            });
          });
        } else {
          this.snackBar.open(texts['heroLikeMaximum'], 'OK', {
            duration: this.appConfig.snackBarDuration
          });
        }
      }
    );
  }
}
