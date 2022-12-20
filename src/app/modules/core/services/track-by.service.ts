import { Injectable } from '@angular/core';
import { Alert } from '~modules/core/services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class TrackByService {
  static trackAlert(index: number, alert: Alert) {
    return alert.id;
  }
}
