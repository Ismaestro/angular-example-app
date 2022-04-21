import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Hero } from './hero.model';
import { Observable } from 'rxjs';
import { HeroService } from './hero.service';

@Injectable()
export class HeroResolver implements Resolve<Observable<Hero>> {
  constructor(private heroService: HeroService) {}

  async resolve(route: ActivatedRouteSnapshot) {
    const id: string = route.paramMap.get('id') || '';
    return this.heroService.getHeroById(id);
  }
}
