import { DeleteHeroData } from '~modules/hero/interfaces/delete-hero-data.interface';

export interface DeleteHeroResponse {
  errors?: unknown;
  data?: {
    removeHero: DeleteHeroData;
  };
}
