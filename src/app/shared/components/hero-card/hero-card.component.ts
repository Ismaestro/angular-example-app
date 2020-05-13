import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Hero } from '../../../modules/heroes/shared/hero.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { ROUTES_CONFIG } from '../../../configs/routes.config';
import { CookieService } from '@gorniv/ngx-universal';
import { isPlatformBrowser } from '@angular/common';
import { HeroService } from '../../../modules/core/services/hero.service';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: { timing: 1, delay: 0 }
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
              private cookieService: CookieService,
              @Inject(PLATFORM_ID) private platformId: object,
              @Inject(ROUTES_CONFIG) public routesConfig: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.canVote = this.heroService.checkIfUserCanVote();
  }

  like(hero: Hero): Promise<void> {
    if (this.canVote) {
      hero.like();
      this.cookieService.put('votes', '' + (Number(this.cookieService.get('votes') || 0) + 1));
      return this.heroService.updateHero(hero);
    } else {
      this.snackBar.open(this.i18n({ value: 'Can\'t vote anymore', id: '@@cannotVote' }), '', { duration: 1000 });
    }
  }

}
