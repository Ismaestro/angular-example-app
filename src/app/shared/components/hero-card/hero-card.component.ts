import {ChangeDetectionStrategy, Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {AppConfig} from '../../../configs/app.config';
import {HeroService} from '../../../modules/heroes/shared/hero.service';
import {Hero} from '../../../modules/heroes/shared/hero.model';
import {Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {MatSnackBar} from '@angular/material';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn} from 'ng-animate';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: {timing: 1, delay: 0}
    }))])
  ]
})
export class HeroCardComponent implements OnInit {

  @Input() hero: Hero;

  canVote: boolean;
  isBrowser: boolean;

  constructor(private heroService: HeroService,
              private router: Router,
              private snackBar: MatSnackBar,
              private i18n: I18n,
              @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
  }

  ngOnInit() {
    this.canVote = this.heroService.checkIfUserCanVote();
  }

  like(hero: Hero): Promise<void> {
    if (this.canVote) {
      hero.like();
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('votes', '' + (Number(localStorage.getItem('votes')) + 1));
      }
      return this.heroService.updateHero(hero);
    } else {
      this.snackBar.open(this.i18n({value: 'Can\'t vote anymore', id: '@@cannotVote'}), '', {duration: 1000});
    }
  }

  seeHeroDetails(hero): void {
    if (hero.default) {
      this.router.navigate([AppConfig.routes.heroes + '/' + hero.id]);
    }
  }

}
