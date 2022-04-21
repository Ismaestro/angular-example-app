import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Hero } from './hero.model';
import { Apollo, gql } from 'apollo-angular';
import { WatchQueryFetchPolicy } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private apollo: Apollo) {}

  searchHeroes({ fetchPolicy }: { fetchPolicy: WatchQueryFetchPolicy }): Observable<Hero[]> {
    return this.apollo
      .watchQuery({
        query: gql`
          query GetFeed {
            searchHeroes(
              query: ""
              after: ""
              first: 10
              orderBy: { direction: desc, field: usersVoted }
              skip: 0
            ) {
              edges {
                cursor
                node {
                  id
                  realName
                  alterEgo
                  image
                  published
                  usersVoted {
                    firstname
                  }
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
        `,
        fetchPolicy,
      })
      .valueChanges.pipe(
        map((result: any) => result.data.searchHeroes.edges.map((edge: any) => new Hero(edge.node)))
      );
  }

  getHeroById(id: string): Observable<Hero> {
    return this.apollo
      .watchQuery({
        query: gql`
        query Hero {
          hero(heroId: "${id}") {
            id
            realName
            alterEgo
            image
            published
          }
        }
      `,
      })
      .valueChanges.pipe(map((result: any) => new Hero(result.data.hero)));
  }

  createHero(hero: Hero) {
    return this.apollo
      .mutate({
        mutation: gql`
        mutation CreateHero {
          createHero(data: {
            realName: "${hero.realName}"
            alterEgo: "${hero.alterEgo}"
          }) {
            id
            realName
            alterEgo
            image
            published
          }
        }
      `,
      })
      .pipe(
        map((response: any) => {
          return !response.errors ? response.data.createHero : response;
        })
      );
  }

  voteHero(hero: Hero) {
    return this.apollo
      .mutate({
        mutation: gql`
        mutation VoteHero {
          voteHero(heroId: "${hero.id}") {
            id
          }
        }
      `,
      })
      .pipe(
        map((response: any) => {
          return !response.errors ? response.data.voteHero : response;
        })
      );
  }

  removeHero(id: string) {
    return this.apollo
      .mutate({
        mutation: gql`
        mutation RemoveHero {
          removeHero(heroId: "${id}") {
            id
          }
        }
      `,
      })
      .pipe(
        map((response: any) => {
          return !response.errors ? {} : response;
        })
      );
  }
}
