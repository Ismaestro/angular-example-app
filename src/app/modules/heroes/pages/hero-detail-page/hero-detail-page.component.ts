import {Component, OnInit} from '@angular/core';
import {Hero} from '../../shared/hero.model';
import {HeroService} from '../../shared/hero.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AppConfig} from '../../../../configs/app.config';
import {UtilsHelperService} from '../../../../core/services/utils-helper.service';

@Component({
  selector: 'app-hero-detail-page',
  templateUrl: './hero-detail-page.component.html',
  styleUrls: ['./hero-detail-page.component.scss'],
  animations: [UtilsHelperService.fadeInOut()]
})

export class HeroDetailPageComponent implements OnInit {

  hero: Hero;
  canVote: boolean;

  constructor(private heroService: HeroService,
              private location: Location,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const heroId = this.activatedRoute.snapshot.paramMap.get('id');
    this.heroService.getHero(heroId).subscribe((hero: Hero) => {
      this.hero = hero;
    });
  }

  goBack(): void {
    this.location.back();
  }

  goToTheAnchor(): void {
    this.router.navigate([`/${AppConfig.routes.heroes}/${this.hero.id}`], {fragment: 'heroe-detail'});
  }
}
