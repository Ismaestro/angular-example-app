import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {AppConfig} from '../../config/app.config';

import {Hero} from './hero.model';
import {Observable} from 'rxjs/Observable';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {LoggerService} from '../../core/logger.service';

@Injectable()
export class HeroService {
  request$: EventEmitter<any>;

  private headers: HttpHeaders;
  private heroesUrl: string;
  private translations: any;

  private handleError(error: any) {
    LoggerService.error('sever error:', error);
    this.request$.emit('finished');
    if (error instanceof Response) {
      return Observable.throw(error.json()['error'] || 'backend server error');
    }
    return Observable.throw(error || 'backend server error');
  }

  constructor(private http: HttpClient,
              private translateService: TranslateService,
              private snackBar: MdSnackBar) {
    this.request$ = new EventEmitter();

    this.heroesUrl = AppConfig.endpoints.heroes;
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.translateService.get(['heroCreated', 'saved', 'heroLikeMaximum', 'heroRemoved'], {
      'value': AppConfig.votesLimit
    }).subscribe((texts) => {
      this.translations = texts;
    });
  }

  getAllHeroes(): Observable<Hero[]> {
    this.request$.emit('starting');
    return this.http.get(this.heroesUrl)
      .map(response => {
        this.request$.emit('finished');
        return response;
      })
      .catch(error => this.handleError(error));
  }

  getHeroById(heroId: string): Observable<Hero> {
    this.request$.emit('starting');
    return this.http.get(this.heroesUrl + '/' + heroId)
      .map(response => {
        this.request$.emit('finished');
        return response;
      })
      .catch(error => this.handleError(error));
  }

  createHero(hero: any): Observable<Hero> {
    this.request$.emit('starting');
    return this.http
      .post(this.heroesUrl, JSON.stringify({
        name: hero.name,
        alterEgo: hero.alterEgo
      }), {headers: this.headers})
      .map(response => {
        this.request$.emit('finished');
        this.showSnackBar('heroCreated');
        return response;
      })
      .catch(error => this.handleError(error));
  }

  like(hero: Hero) {
    if (this.checkIfUserCanVote()) {
      this.request$.emit('starting');
      const url = `${this.heroesUrl}/${hero.id}/like`;
      return this.http
        .post(url, {}, {headers: this.headers})
        .map((response) => {
          this.request$.emit('finished');
          localStorage.setItem('votes', '' + (Number(localStorage.getItem('votes')) + 1));
          hero.likes += 1;
          this.showSnackBar('saved');
          return response;
        })
        .catch(error => this.handleError(error));
    } else {
      this.showSnackBar('heroLikeMaximum');
      return Observable.throw('maximum votes');
    }
  }

  checkIfUserCanVote(): boolean {
    return Number(localStorage.getItem('votes')) < AppConfig.votesLimit;
  }

  deleteHeroById(id: any): Observable<Array<Hero>> {
    this.request$.emit('starting');
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map((response) => {
        this.request$.emit('finished');
        this.showSnackBar('heroRemoved');
        return response;
      })
      .catch(error => this.handleError(error));
  }

  showSnackBar(name): void {
    const config: any = new MdSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(this.translations[name], 'OK', config);
  }
}
