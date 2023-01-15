import { Hero } from '~modules/hero/shared/hero.model';

export interface SearchHeroesData {
  edges: {
    cursor: string;
    node: Hero;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}
