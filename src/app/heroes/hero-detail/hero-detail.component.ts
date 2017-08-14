import {Component} from '@angular/core';
import {Hero} from '../shared/hero.model';
import {HeroService} from '../shared/hero.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})

export class HeroDetailComponent {
  hero: Hero;
  canVote: boolean;

  constructor(private heroService: HeroService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params['id']) {
        this.heroService.getHeroById(params['id']).subscribe((hero: Hero) => {
          this.hero = hero;
        });
      }
    });
  }

  like(hero: Hero) {
    return new Promise((resolve, reject) => {
      this.heroService.like(hero).subscribe(() => {
        this.canVote = this.heroService.checkIfUserCanVote();
        resolve(true);
      }, (error) => {
        reject(error);
      });
    });
  }
}
