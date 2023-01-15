import { Hero } from '~modules/hero/shared/hero.model';

export interface VoteForHeroResponse {
  errors?: unknown;
  data?: {
    voteHero: Hero;
  };
}
