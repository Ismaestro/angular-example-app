import {EventEmitter, Inject, Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import {APP_CONFIG} from '../../config/app.config';
import {IAppConfig} from '../../config/iapp.config';

import {Hero} from './hero.model';
import {Observable} from 'rxjs/Observable';
import {MdSnackBar} from '@angular/material';
import {TranslateService} from 'ng2-translate';

@Injectable()
export class HeroService {
  request$: EventEmitter<any>;

  private headers;
  private heroesUrl;
  private translations: Array<string>;


  private handleError(error: any): Promise<any> {
    this.request$.emit('finished');

    return Promise.reject(error.message || error);
  }

  constructor(private http: Http,
              private translateService: TranslateService,
              private snackBar: MdSnackBar,
              @Inject(APP_CONFIG) private appConfig: IAppConfig) {
    this.request$ = new EventEmitter();

    this.heroesUrl = this.appConfig.endpoints.heroes;
    this.headers = new Headers({'Content-Type': 'application/json'});

    this.translateService.get(['heroCreated', 'saved', 'heroLikeMaximum', 'heroRemoved'], {
      'value': this.appConfig.votesLimit
    }).subscribe((texts) => {
      this.translations = texts;
    });
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
        name: hero.name,
        alterEgo: hero.alterEgo
      }), {headers: this.headers})
      .map(res => {
        this.request$.emit('finished');
        this.snackBar.open(this.translations['heroCreated'], 'OK', {
          duration: this.appConfig.snackBarDuration
        });
        return res.json();
      })
      .catch(this.handleError);
  }

  like(hero) {
    if (this.checkIfUserCanVote()) {
      this.request$.emit('starting');
      const url = `${this.heroesUrl}/${hero.id}/like`;
      return this.http
        .post(url, {}, {headers: this.headers})
        .map((response) => {
          this.request$.emit('finished');
          localStorage.setItem('votes', '' + (Number(localStorage.getItem('votes')) + 1));
          hero.likes += 1;
          this.snackBar.open(this.translations['saved'], 'OK', {
            duration: this.appConfig.snackBarDuration,
          });
          return response;
        })
        .catch(this.handleError);
    } else {
      this.snackBar.open(this.translations['heroLikeMaximum'], 'OK', {
        duration: this.appConfig.snackBarDuration
      });

      return Observable.of('');
    }
  }

  checkIfUserCanVote() {
    return Number(localStorage.getItem('votes')) < this.appConfig.votesLimit;
  }

  remove(id: string): Observable<Array<Hero>> {
    this.request$.emit('starting');
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map((response) => {
        this.request$.emit('finished');
        this.snackBar.open(this.translations['heroRemoved'], 'OK', {
          duration: this.appConfig.snackBarDuration
        });
        return response.json() as Hero[];
      })
      .catch(this.handleError);
  }
}
