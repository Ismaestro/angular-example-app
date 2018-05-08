import {Component, OnInit} from '@angular/core';
import {Hero} from '../shared/hero.model';
import {HeroService} from '../shared/hero.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})

export class HeroDetailComponent implements OnInit {

  hero: Hero;
  canVote: boolean;

  constructor(private heroService: HeroService,
              private location: Location,
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
}
