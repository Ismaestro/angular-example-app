import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Hero} from '../../../modules/heroes/shared/hero.model';
import {HeroService} from '../../../modules/heroes/shared/hero.service';
import {AppConfig} from '../../../config/app.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})

export class HomePage implements OnInit {
  heroes: Hero[] = null;
  canVote = false;

  constructor(private heroService: HeroService,
              private router: Router) {
    this.canVote = HeroService.checkIfUserCanVote();
  }

  ngOnInit() {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes.sort((a, b) => {
        return b.likes - a.likes;
      }).slice(0, AppConfig.topHeroesLimit);
    });
  }

  like(hero: Hero): Promise<any> {
    return new Promise((resolve, reject) => {
      this.heroService.like(hero).subscribe(() => {
        this.canVote = HeroService.checkIfUserCanVote();
        resolve(true);
      }, (error) => {
        reject(error);
      });
    });
  }

  seeHeroDetails(hero): void {
    if (hero.default) {
      this.router.navigate([AppConfig.routes.heroes + '/' + hero.id]);
    }
  }
}
