import { Injectable } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { Hero } from '~modules/hero/shared/hero.model';
import { AppConfig } from '~app/configs/app.config';
import { HeroService } from '~modules/hero/shared/hero.service';
import { StorageService } from '~shared/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class HeroDataService {
  private heroes: Hero[] | null;

  constructor(private readonly heroService: HeroService) {
    this.heroes = StorageService.get(AppConfig.storage.keys.heroes) as unknown as Hero[];
  }

  searchHeroes(): Observable<Hero[]> {
    if (this.heroes) {
      return of(this.heroes);
    }

    const heroes$ = this.heroService.searchHeroes({ fetchPolicy: 'no-cache' });
    heroes$.pipe(take(1)).subscribe(heroes => {
      StorageService.set(AppConfig.storage.keys.heroes, JSON.stringify(heroes));
    });
    return heroes$;
  }

  flushCache() {
    this.heroes = null;
    StorageService.remove(AppConfig.storage.keys.heroes);
  }
}
