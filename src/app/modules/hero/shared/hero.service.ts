import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { searchHeroesQuery } from '~modules/hero/shared/hero-queries.graphql';
import { SearchHeroesResponse } from '~modules/hero/interfaces/search-heroes-response.interface';
import { Hero } from '~modules/hero/shared/hero.model';
import {
  createHeroMutation,
  deleteHeroMutation,
  voteForHeroMutation,
} from '~modules/hero/shared/hero-mutations.graphql';
import { VoteForHeroResponse } from '~modules/hero/interfaces/vote-for-hero-response.interface';
import { CreateHeroData } from '~modules/hero/interfaces/create-hero-data.interface';
import { CreateHeroResponse } from '~modules/hero/interfaces/create-hero-response.interface';
import { DeleteHeroResponse } from '~modules/hero/interfaces/delete-hero-response.interface';
import { DeleteHeroData } from '~modules/hero/interfaces/delete-hero-data.interface';

export enum OrderDirection {
  DESC = 'desc',
}

export enum HeroOrderField {
  USERS_VOTED = 'usersVoted',
}

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private apollo: Apollo) {}

  // eslint-disable-next-line max-lines-per-function
  searchHeroes(options: {
    query: string;
    after: string;
    first: number;
    orderBy: { direction: OrderDirection; field: HeroOrderField };
    skip: number;
  }): Observable<Hero[] | null> {
    return this.apollo
      .query({
        query: searchHeroesQuery,
        variables: {
          query: options.query,
          after: options.after,
          first: options.first,
          direction: options.orderBy.direction,
          field: options.orderBy.field,
          skip: options.skip,
        },
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((response: unknown) => {
          const searchHeroesData = (response as SearchHeroesResponse).data?.searchHeroes;
          if (searchHeroesData) {
            if (searchHeroesData.edges?.length) {
              return searchHeroesData.edges.map(edge => edge.node);
            }
            return [];
          }
          return null;
        }),
      );
  }

  createHero(data: CreateHeroData): Observable<Hero | null> {
    return this.apollo
      .mutate({
        mutation: createHeroMutation,
        variables: data,
      })
      .pipe(
        map((response: unknown) => {
          return (response as CreateHeroResponse).data?.createHero ?? null;
        }),
      );
  }

  deleteHero(heroId: string): Observable<DeleteHeroData | null> {
    return this.apollo
      .mutate({
        mutation: deleteHeroMutation,
        variables: {
          heroId,
        },
      })
      .pipe(map((response: unknown) => (response as DeleteHeroResponse).data?.removeHero ?? null));
  }

  voteForHero(heroId: string): Observable<Hero | null> {
    return this.apollo
      .mutate({
        mutation: voteForHeroMutation,
        variables: {
          heroId,
        },
      })
      .pipe(
        map((response: unknown) => {
          return (response as VoteForHeroResponse).data?.voteHero ?? null;
        }),
      );
  }
}
