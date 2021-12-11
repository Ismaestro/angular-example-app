import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { Hero } from '../../../modules/hero/shared/hero.model';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { ROUTES_CONFIG } from '../../../configs/routes.config';
import { HeroService } from '../../../modules/hero/shared/hero.service';

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
export class HeroCardComponent {

  @Input() hero: Hero | undefined;

  constructor(private heroService: HeroService,
              @Inject(ROUTES_CONFIG) public routesConfig: any) {
  }

  like(hero: Hero): Promise<void> | void {
    return this.heroService.updateHero(hero);
  }

}
