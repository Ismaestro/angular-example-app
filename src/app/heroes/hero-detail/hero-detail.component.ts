import {Component} from '@angular/core';
import {Hero} from '../shared/hero.model';
import {HeroService} from '../shared/hero.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'toh-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})

export class HeroDetailComponent {
  hero: Hero;
  canVote: boolean;

  constructor(private heroService: HeroService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.heroService.getHeroById(params['id']).subscribe((hero) => {
        this.hero = hero;
      });
    });
  }

  like(hero) {
    this.heroService.like(hero).subscribe(() => {
      this.canVote = this.heroService.checkIfUserCanVote();
    });
  }
}
