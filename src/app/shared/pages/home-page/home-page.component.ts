import {Component, OnInit} from '@angular/core';
import {Hero} from '../../../modules/heroes/shared/hero.model';
import {HeroService} from '../../../modules/heroes/shared/hero.service';
import {AppConfig} from '../../../configs/app.config';
import {UtilsHelperService} from '../../../core/services/utils-helper.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [UtilsHelperService.fadeInOut()]
})

export class HomePageComponent implements OnInit {
  heroes: Hero[] = null;

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.heroService.getHeroes().subscribe((heroes: Array<Hero>) => {
      this.heroes = heroes.slice(0, AppConfig.topHeroesLimit);
    });
  }
}
