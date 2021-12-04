import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AppConfig } from '../../../configs/app.config';
import { CookieService } from '@gorniv/ngx-universal';
import { Hero } from '../../hero/shared/hero.model';
import { LoggerService } from './logger.service';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private snackBar: MatSnackBar,
              private apollo: Apollo,
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
    return this.apollo
    .watchQuery({
      query: gql`
        query GetFeed {
          searchHeroes(
            query: ""
            after: ""
            first: 10
            orderBy: {
              direction: asc
              field: createdAt
            }
            skip: 0
          ) {
            edges {
              cursor
              node {
                id
                realName
                alterEgo
                votes
                image
                published
              }
            }
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
            totalCount
          }
        }
      `
    })
    .valueChanges.pipe(map((result: any) => result.data.searchHeroes.edges.map((edge) => new Hero(edge.node))));
  }

  getHeroById(id: string): Observable<Hero> {
    return this.apollo.watchQuery({
      query: gql`
        query Hero {
          hero(heroId: "${id}") {
            id
            realName
            alterEgo
            votes
            image
            published
          }
        }
      `
    }).valueChanges.pipe(map((result: any) => new Hero(result.data.hero)));
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
