import { Component, OnInit } from '@angular/core';
import { Hero } from '../../modules/heroes/shared/hero.model';
import { AppConfig } from '../../configs/app.config';
import { Observable } from 'rxjs';
import { defaultIfEmpty, map } from 'rxjs/operators';
import { HeroService } from '../../modules/core/services/hero.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.heroes$ = this.heroService.getHeroes().pipe(
      map((heroes) => heroes.slice(0, AppConfig.topHeroesLimit)),
      defaultIfEmpty([])
    );
  }
}
