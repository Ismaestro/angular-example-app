import { Hero } from '~modules/hero/shared/hero.model';

export interface CreateHeroResponse {
  errors?: unknown;
  data?: {
    createHero: Hero;
  };
}
