import {Inject, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {Hero} from '../shared/hero.model';
import {IAppConfig} from '../../config/iapp.config';
import {APP_CONFIG} from '../../config/app.config';

@Injectable()
export class HeroSearchService {
  constructor(private http: Http,
              @Inject(APP_CONFIG) private appConfig: IAppConfig) {
  }

  search(term: string): Observable<Hero[]> {
    return this.http
      .get(this.appConfig.endpoints.heroes)
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
