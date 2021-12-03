import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AppConfig } from '../../../configs/app.config';
import { CookieService } from '@gorniv/ngx-universal';
import { Hero } from '../../heroes/shared/hero.model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private snackBar: MatSnackBar,
              private cookieService: CookieService) {
  }

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result);
    };
  }

  checkIfUserCanVote(): boolean {
    const votes = this.cookieService.get('votes');
    return Number(votes ? votes : 0) < AppConfig.votesLimit;
  }

  getHeroes(): Observable<Hero[]> {
    return of()
      .pipe(
        map((actions: any[]) => {
          return actions.map((action) => {
            const data = action.payload.doc.data();
            return new Hero({ id: action.payload.doc.id, ...data });
          });
        }),
        tap(() => LoggerService.log(`fetched heroes`)),
        catchError(HeroService.handleError('getHeroes', []))
      );
  }

  getHero(id: string): Observable<any> {
    return of().pipe(
      map((hero: any) => {
        return new Hero({ id, ...hero.data() });
      }),
      tap(() => LoggerService.log(`fetched hero ${id}`)),
      catchError(HeroService.handleError('getHero', []))
    );
  }

  createHero(hero: Hero) {
    return new Promise((resolve) => {
      resolve((JSON.parse(JSON.stringify(hero))));
    });
  }

  updateHero(hero: Hero): Promise<void> {
    return new Promise((resolve) => {
      resolve((JSON.parse(JSON.stringify(hero))));
    });
  }

  deleteHero(id: string): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  showSnackBar(name): void {
    const config: any = new MatSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(name, 'OK', config);
  }
}
