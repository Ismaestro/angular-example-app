import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../configs/app.config';
import { Hero } from './hero.model';
import { Apollo, gql } from 'apollo-angular';
import { StorageService } from '../../../shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private apollo: Apollo,
              private storageService: StorageService) {
  }

  checkIfUserCanVote(): boolean {
    const votes = this.storageService.getCookie('votes');
    return Number(votes ? votes : 0) < AppConfig.votesLimit;
  }

  searchHeroes(): Observable<Hero[]> {
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
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateHero {
          createHero(data: {
            realName: "${hero.realName}"
            alterEgo: "${hero.alterEgo}"
          }) {
            id
            realName
            alterEgo
            votes
            image
            published
          }
        }
      `
    }).pipe(map((response: any) => {
      return !response.errors ? response.data.createHero : response;
    }));
  }

  updateHero(hero: Hero): Promise<void> {
    return new Promise((resolve) => {
      resolve((JSON.parse(JSON.stringify(hero))));
    });
  }

  removeHero(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation RemoveHero {
          removeHero(heroId: "${id}") {
            id
          }
        }
      `
    }).pipe(map((response: any) => {
      return !response.errors ? {} : response;
    }));
  }
}
