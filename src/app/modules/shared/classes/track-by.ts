import { Alert } from '~modules/shared/services/alert.service';
import { Hero } from '~modules/hero/shared/hero.model';

export class TrackBy {
  static trackAlert(index: number, alert: Alert) {
    return alert.id;
  }
  static trackHero(index: number, hero: Hero) {
    return hero.id;
  }
}
