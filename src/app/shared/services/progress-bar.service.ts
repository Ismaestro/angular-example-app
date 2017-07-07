import {EventEmitter, Injectable} from '@angular/core';
import {HeroService} from '../../heroes/shared/hero.service';

@Injectable()
export class ProgressBarService {
  public updateProgressBar$: EventEmitter<any>;

  private requestsRunning = 0;

  constructor(private heroService: HeroService) {
    this.updateProgressBar$ = new EventEmitter();

    this.heroService.request$.subscribe((type) => {
      if (type === 'starting') {
        this.requestsRunning++;
        if (this.requestsRunning === 1) {
          this.updateProgressBar$.emit('query');
        }
      } else {
        this.requestsRunning--;
        if (this.requestsRunning === 0) {
          this.updateProgressBar$.emit('none');
        }
      }
    });
  }
}
