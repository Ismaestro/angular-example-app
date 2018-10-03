import {Component, OnInit} from '@angular/core';
import {Hero} from '../../shared/hero.model';
import {HeroService} from '../../shared/hero.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AppConfig} from '../../../../configs/app.config';

@Component({
  selector: 'app-hero-detail-page',
  templateUrl: './hero-detail-page.component.html',
  styleUrls: ['./hero-detail-page.component.scss']
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
    this.heroService.getHeroById(heroId).subscribe((hero: Hero) => {
      this.hero = hero;
    });
  }

  like(hero: Hero) {
    return new Promise((resolve, reject) => {
      this.heroService.like(hero).subscribe(() => {
        this.canVote = HeroService.checkIfUserCanVote();
        resolve(true);
      }, (error) => {
        reject(error);
      });
    });
  }

  dynamicImport() {
    import('html2canvas').then((html2canvas: any) => {
      html2canvas.default(document.getElementById('heroe-detail')).then((canvas) => {
        window.open().document.write('<img src="' + canvas.toDataURL() + '" />');
      });
    });
  }

  goBack(): void {
    this.location.back();
  }

  goToTheAnchor(): void {
    this.router.navigate([`/${AppConfig.routes.heroes}/${this.hero.id}`], {fragment: 'heroe-detail'});
  }
}
