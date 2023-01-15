import { SearchHeroesData } from '~modules/hero/interfaces/search-heroes-data.interface';

export interface SearchHeroesResponse {
  errors?: unknown;
  data?: {
    searchHeroes: SearchHeroesData;
  };
}
