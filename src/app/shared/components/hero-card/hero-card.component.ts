import {Component, Input, OnInit} from '@angular/core';
import {AppConfig} from '../../../configs/app.config';
import {HeroService} from '../../../modules/heroes/shared/hero.service';
import {Hero} from '../../../modules/heroes/shared/hero.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {

  @Input() hero: Hero;

  canVote: boolean;

  constructor(private heroService: HeroService,
              private router: Router) {
    this.canVote = HeroService.checkIfUserCanVote();
  }

  ngOnInit() {
  }

  like(hero: Hero): Promise<void> {
    if (this.canVote) {
      hero.like();
      return this.heroService.updateHero(hero);
    }
  }

  seeHeroDetails(hero): void {
    if (hero.default) {
      this.router.navigate([AppConfig.routes.heroes + '/' + hero.id]);
    }
  }

}
