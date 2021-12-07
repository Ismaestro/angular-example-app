import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { Hero } from '../../../modules/hero/shared/hero.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { ROUTES_CONFIG } from '../../../configs/routes.config';
import { HeroService } from '../../../modules/hero/shared/hero.service';
import { StorageService } from '../../services/storage.service';

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

  constructor(private heroService: HeroService,
              private router: Router,
              private snackBar: MatSnackBar,
              private storageService: StorageService,
              @Inject(ROUTES_CONFIG) public routesConfig: any) {
  }

  ngOnInit() {
    this.canVote = this.heroService.checkIfUserCanVote();
  }

  like(hero: Hero): Promise<void> {
    if (this.canVote) {
      hero.like();
      this.storageService.setCookie('votes', '' + (Number(this.storageService.getCookie('votes') || 0) + 1));
      return this.heroService.updateHero(hero);
    } else {
      this.snackBar.open('Can\'t vote anymore', '', { duration: 1000 });
    }
  }

}
