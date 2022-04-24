import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../../../hero/shared/hero.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { EventsService, EventsTypes } from '../../../core/services/events.servide';
import { HeroDataService } from '~modules/hero/shared/hero-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  heroes$: Observable<Hero[]> | undefined;

  constructor(private heroDataService: HeroDataService, private eventsService: EventsService) {
    // @ts-ignore
    if (window.Cypress) {
      // @ts-ignore
      window.HomePageComponent = this;
    }
  }

  ngOnInit() {
    this.heroes$ = this.heroDataService.searchHeroes();

    this.eventsService.events$.pipe(takeUntil(this.destroy$)).subscribe(event => {
      if (event.type === EventsTypes.UPDATE_HEROES) {
        this.heroDataService.flushCache();
        this.heroes$ = this.heroDataService.searchHeroes();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
