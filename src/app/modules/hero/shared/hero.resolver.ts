import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Hero } from './hero.model';
import { Observable } from 'rxjs';
import { HeroService } from '../../core/services/hero.service';

@Injectable()
export class HeroResolver implements Resolve<Observable<Hero>> {
  constructor(private heroService: HeroService) {
  }

  async resolve(route: ActivatedRouteSnapshot) {
    return this.heroService.getHeroById(route.paramMap.get('id'));
  }
}
