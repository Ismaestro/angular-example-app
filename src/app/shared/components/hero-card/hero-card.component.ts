import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { Hero } from '~modules/hero/shared/hero.model';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { ROUTES_CONFIG, RoutesConfig } from '~app/configs/routes.config';
import { HeroService } from '~modules/hero/shared/hero.service';
import { Router } from '@angular/router';
import { AuthService } from '~modules/auth/auth.service';
import { UtilsService } from '../../services/utils.service';
import { EventsService, EventsTypes } from '~modules/core/services/events.servide';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(
        '* => *',
        useAnimation(fadeIn, {
          params: { timing: 1, delay: 0 },
        })
      ),
    ]),
  ],
})
export class HeroCardComponent {
  @Input() hero: Hero | undefined;

  constructor(
    private heroService: HeroService,
    private router: Router,
    private utilsService: UtilsService,
    private authService: AuthService,
    private eventsService: EventsService,
    @Inject(ROUTES_CONFIG) public routesConfig: any
  ) {}

  like(hero: Hero): Promise<void> | void {
    if (this.authService.isLoggedIn()) {
      this.heroService.voteHero(hero).subscribe(response => {
        if (!response.errors) {
          this.eventsService.send({ type: EventsTypes.UPDATE_HEROES });
        } else {
          this.utilsService.showSnackBar(response.errors[0].message, 'warning-snack-bar');
        }
      });
    } else {
      this.router.navigate([RoutesConfig.routes.auth.logIn]);
    }
  }
}
