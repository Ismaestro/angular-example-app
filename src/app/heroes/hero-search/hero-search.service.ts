import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable}     from 'rxjs';

import {Hero} from '../shared/hero.model';

@Injectable()
export class HeroSearchService {
  constructor(private http: Http) {
  }

  search(term: string): Observable<Hero[]> {
    return this.http
      .get(`api/heroes`)
      .map((res: Response) => {
        let matchedHeroes = [];
        let heroes = res.json();
        for (let hero of heroes) {
          if (hero.name.toLowerCase().indexOf(term.toLowerCase()) !== -1) {
            matchedHeroes.push(hero);
          }
        }
        return matchedHeroes;
      });
  }
}
