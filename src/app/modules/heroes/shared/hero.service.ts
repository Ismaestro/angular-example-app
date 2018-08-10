import {Observable, of, throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConfig} from '../../../config/app.config';
import {Hero} from './hero.model';
import {catchError, tap} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import {LoggerService} from '../../../core/services/logger.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class HeroService {
  heroesUrl: string;

  static checkIfUserCanVote(): boolean {
    return Number(localStorage.getItem('votes')) < AppConfig.votesLimit;
  }

  constructor(private http: HttpClient,
              private translateService: TranslateService,
              private snackBar: MatSnackBar) {
    this.heroesUrl = AppConfig.endpoints.heroes;
  }

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result as T);
    };
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(() => LoggerService.log(`fetched heroes`)),
        catchError(HeroService.handleError('getHeroes', []))
      );
  }

  getHeroById(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(() => LoggerService.log(`fetched hero id=${id}`)),
      catchError(HeroService.handleError<Hero>(`getHero id=${id}`))
    );
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, JSON.stringify({
      name: hero.name,
      alterEgo: hero.alterEgo
    }), httpOptions).pipe(
      tap((heroSaved: Hero) => {
        LoggerService.log(`added hero w/ id=${heroSaved.id}`);
        this.showSnackBar('heroCreated');
      }),
      catchError(HeroService.handleError<Hero>('addHero'))
    );
  }

  deleteHeroById(id: any): Observable<Array<Hero>> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Array<Hero>>(url, httpOptions).pipe(
      tap(() => LoggerService.log(`deleted hero id=${id}`)),
      catchError(HeroService.handleError<Array<Hero>>('deleteHero'))
    );
  }

  like(hero: Hero) {
    if (HeroService.checkIfUserCanVote()) {
      const url = `${this.heroesUrl}/${hero.id}/like`;
      return this.http
        .post(url, {}, httpOptions)
        .pipe(
          tap(() => {
            LoggerService.log(`updated hero id=${hero.id}`);
            localStorage.setItem('votes', '' + (Number(localStorage.getItem('votes')) + 1));
            hero.likes += 1;
            this.showSnackBar('saved');
          }),
          catchError(HeroService.handleError<any>('updateHero'))
        );
    } else {
      this.showSnackBar('heroLikeMaximum');
      return observableThrowError('maximum votes');
    }
  }

  showSnackBar(name): void {
    this.translateService.get([String(_('heroCreated')), String(_('saved')),
      String(_('heroLikeMaximum')), String(_('heroRemoved'))], {'value': AppConfig.votesLimit}).subscribe((texts) => {
      const config: any = new MatSnackBarConfig();
      config.duration = AppConfig.snackBarDuration;
      this.snackBar.open(texts[name], 'OK', config);
    });
  }
}
