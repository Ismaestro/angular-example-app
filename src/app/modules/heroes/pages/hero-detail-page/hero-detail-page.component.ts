import { Component, OnInit } from '@angular/core';
import { Hero } from '../../shared/hero.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { RoutesConfig } from '../../../../configs/routes.config';

@Component({
  selector: 'app-hero-detail-page',
  templateUrl: './hero-detail-page.component.html',
  styleUrls: ['./hero-detail-page.component.scss'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: { timing: 1, delay: 0 }
    }))])
  ]
})

export class HeroDetailPageComponent implements OnInit {

  hero: Hero;

  constructor(private location: Location,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.hero = this.activatedRoute.snapshot.data.hero;
  }

  goBack(): void {
    this.location.back();
  }

  goToTheAnchor(): void {
    this.router.navigate([RoutesConfig.routes.heroes.detail(this.hero.id)], { fragment: 'heroe-detail' });
  }
}
