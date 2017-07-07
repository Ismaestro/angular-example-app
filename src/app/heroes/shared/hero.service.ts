import {EventEmitter, Inject, Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import {APP_CONFIG} from '../../config/app.config';
import {IAppConfig} from '../../config/iapp.config';

import {Hero} from './hero.model';

@Injectable()
export class HeroService {
  refreshHeroes$: EventEmitter<any>;

  private headers;
  private heroesUrl;

  private static handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  constructor(private http: Http,
              @Inject(APP_CONFIG) private appConfig: IAppConfig) {
    this.refreshHeroes$ = new EventEmitter();

    this.heroesUrl = this.appConfig.endpoints.heroes;
    this.headers = new Headers({'Content-Type': 'application/json'});
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json() as Hero[])
      .catch(HeroService.handleError);
  }

  getHeroById(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Hero)
      .catch(HeroService.handleError);
  }

  create(hero: Hero): Promise<Array<Hero>> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({
        id: hero.id,
        name: hero.name,
        alterEgo: hero.alterEgo
      }), {headers: this.headers})
      .toPromise()
      .then(res => {
        const heroes = res.json();
        this.refreshHeroes$.emit(heroes);
        return heroes;
      })
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

  likeHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}/like`;
    return this.http
      .post(url, {}, {headers: this.headers})
      .toPromise()
      .then((response) => {
        localStorage.setItem('votes', '' + (Number(localStorage.getItem('votes')) + 1));
        return response;
      })
      .catch(HeroService.handleError);
  }

  remove(id: string): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(HeroService.handleError);
  }
}
