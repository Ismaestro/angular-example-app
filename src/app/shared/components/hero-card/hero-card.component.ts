import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {AppConfig} from '../../../configs/app.config';
import {HeroService} from '../../../modules/heroes/shared/hero.service';
import {Hero} from '../../../modules/heroes/shared/hero.model';
import {Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {

  @Input() hero: Hero;

  canVote: boolean;

  constructor(private heroService: HeroService,
              private router: Router,
              private snackBar: MatSnackBar,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.canVote = this.heroService.checkIfUserCanVote();
  }

  ngOnInit() {
  }

  like(hero: Hero): Promise<void> {
    if (this.canVote) {
      hero.like();
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('votes', '' + (Number(localStorage.getItem('votes')) + 1));
      }
      return this.heroService.updateHero(hero);
    } else {
      console.log(this.snackBar);
      this.snackBar.open('updateBrowser', 'OK');
    }
  }

  seeHeroDetails(hero): void {
    if (hero.default) {
      this.router.navigate([AppConfig.routes.heroes + '/' + hero.id]);
    }
  }

}
