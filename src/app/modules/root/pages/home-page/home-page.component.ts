import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../hero/shared/hero.model';
import { Observable } from 'rxjs';
import { HeroService } from '../../../core/services/hero.service';

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
    this.heroes$ = this.heroService.getHeroes();
  }
}
