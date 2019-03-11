import {Observable, of} from 'rxjs';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Hero} from './hero.model';
import {catchError, map, tap} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {LoggerService} from '../../../core/services/logger.service';
import {AppConfig} from '../../../configs/app.config';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {isPlatformBrowser} from '@angular/common';
import {I18n} from '@ngx-translate/i18n-polyfill';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesCollection: AngularFirestoreCollection<Hero>;

  constructor(private afs: AngularFirestore,
              private snackBar: MatSnackBar,
              private i18n: I18n,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.heroesCollection = this.afs.collection<Hero>(AppConfig.routes.heroes, (hero) => {
      return hero.orderBy('default', 'desc').orderBy('likes', 'desc');
    });
  }

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result as T);
    };
  }

  checkIfUserCanVote(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return Number(localStorage.getItem('votes')) < AppConfig.votesLimit;
    }
    return false;
  }

  getHeroes(): Observable<Hero[]> {
    return this.heroesCollection.snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            const data = action.payload.doc.data();
            return new Hero({id: action.payload.doc.id, ...data});
          });
        }),
        tap(() => LoggerService.log(`fetched heroes`)),
        catchError(HeroService.handleError('getHeroes', []))
      );
  }

  getHero(id: string): Observable<any> {
    return this.afs.doc(`${AppConfig.routes.heroes}/${id}`).get().pipe(
      map((hero) => {
        return new Hero({id, ...hero.data()});
      }),
      tap(() => LoggerService.log(`fetched hero ${id}`)),
      catchError(HeroService.handleError('getHero', []))
    );
  }

  createHero(hero: Hero): Promise<DocumentReference> {
    return this.heroesCollection.add(JSON.parse(JSON.stringify(hero)));
  }

  updateHero(hero: Hero): Promise<void> {
    return this.afs.doc(`${AppConfig.routes.heroes}/${hero.id}`).update(JSON.parse(JSON.stringify(hero))).then(() => {
      LoggerService.log(`updated hero w/ id=${hero.id}`);
      this.showSnackBar(this.i18n({value: 'Saved', id: '@@saved'}));
    });
  }

  deleteHero(id: string): Promise<void> {
    return this.afs.doc(`${AppConfig.routes.heroes}/${id}`).delete();
  }

  showSnackBar(name): void {
    const config: any = new MatSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(name, 'OK', config);
  }
}
