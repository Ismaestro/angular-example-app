import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../hero/shared/hero.model';
import { Observable } from 'rxjs';
import { HeroService } from '../../../hero/shared/hero.service';
import { EventsService, EventsTypes } from '../../../core/services/events.servide';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  heroes$: Observable<Hero[]> | undefined;

  constructor(private heroService: HeroService, private eventsService: EventsService) {
    // @ts-ignore
    if (window.Cypress) {
      // @ts-ignore
      window.HomePageComponent = this;
    }
  }

  ngOnInit() {
    this.heroes$ = this.heroService.searchHeroes({ fetchPolicy: 'no-cache' });

    this.eventsService.events$.subscribe(event => {
      if (event.type === EventsTypes.UPDATE_HEROES) {
        this.heroes$ = this.heroService.searchHeroes({ fetchPolicy: 'no-cache' });
      }
    });
  }
}
