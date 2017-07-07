import {EventEmitter, Inject, Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import {APP_CONFIG} from '../../config/app.config';
import {IAppConfig} from '../../config/iapp.config';

import {Hero} from './hero.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HeroService {
  refreshHeroes$: EventEmitter<any>;
  request$: EventEmitter<any>;

  private headers;
  private heroesUrl;

  private handleError(error: any): Promise<any> {
    this.request$.emit('finished');

    return Promise.reject(error.message || error);
  }

  constructor(private http: Http,
              @Inject(APP_CONFIG) private appConfig: IAppConfig) {
    this.refreshHeroes$ = new EventEmitter();
    this.request$ = new EventEmitter();

    this.heroesUrl = this.appConfig.endpoints.heroes;
    this.headers = new Headers({'Content-Type': 'application/json'});
  }

  get(): Observable<Hero[]> {
    this.request$.emit('starting');
    return this.http.get(this.heroesUrl)
      .map(response => {
        this.request$.emit('finished');
        return response.json() as Hero[];
      })
      .catch(this.handleError);
  }

  create(hero: Hero): Observable<Array<Hero>> {
    this.request$.emit('starting');
    return this.http
      .post(this.heroesUrl, JSON.stringify({
        id: hero.id,
        name: hero.name,
        alterEgo: hero.alterEgo
      }), {headers: this.headers})
      .map(res => {
        this.request$.emit('finished');
        const heroes = res.json();
        this.refreshHeroes$.emit(heroes);
        return heroes;
      })
      .catch(this.handleError);
  }

  like(id: number): Observable<Hero> {
    this.request$.emit('starting');
    const url = `${this.heroesUrl}/${id}/like`;
    return this.http
      .post(url, {}, {headers: this.headers})
      .map((response) => {
        this.request$.emit('finished');
        localStorage.setItem('votes', '' + (Number(localStorage.getItem('votes')) + 1));
        return response;
      })
      .catch(this.handleError);
  }

  remove(id: string): Observable<void> {
    this.request$.emit('starting');
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map(() => {
        this.request$.emit('finished');
      })
      .catch(this.handleError);
  }
}
