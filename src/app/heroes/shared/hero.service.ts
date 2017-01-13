import {Injectable, Inject} from '@angular/core';
import {Headers, Http}      from '@angular/http';

import {APP_CONFIG} from '../../config/app.config';
import {IAppConfig} from '../../config/iapp.config';

import {Hero} from './hero.model';

@Injectable()
export class HeroService {
  private headers;
  private heroesUrl;

  private static handleError(error: any): Promise<any> {
    window.alert(error._body);
    return Promise.reject(error.message || error);
  }

  constructor(private http: Http,
              @Inject(APP_CONFIG) private appConfig: IAppConfig) {
    this.heroesUrl = this.appConfig.endpoints.heroes;
    this.headers = new Headers({'Content-Type': 'application/json'});
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json() as Hero[])
      .catch(HeroService.handleError);
  }

  getHeroesPowers(): Promise<string[]> {
    return this.http.get(this.appConfig.endpoints.heroesPowers)
      .toPromise()
      .then(response => response.json() as string[])
      .catch(HeroService.handleError);
  }

  getHeroById(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Hero)
      .catch(HeroService.handleError);
  }

  create(hero: Hero): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({
        name: hero.name,
        alterEgo: hero.alterEgo,
        power: hero.power
      }), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(HeroService.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(HeroService.handleError);
  }

  remove(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(HeroService.handleError);
  }
}
