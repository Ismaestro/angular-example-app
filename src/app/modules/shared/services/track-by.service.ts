import { Injectable } from '@angular/core';
import { Alert } from '~modules/shared/services/alert.service';
import { Hero } from '~modules/hero/shared/hero.model';

@Injectable({
  providedIn: 'root',
})
export class TrackByService {
  static trackAlert(index: number, alert: Alert) {
    return alert.id;
  }
  static trackHero(index: number, hero: Hero) {
    return hero.id;
  }
}
