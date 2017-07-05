import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {APP_CONFIG} from '../../config/app.config';
import {IAppConfig} from '../../config/iapp.config';
import {LoggerService} from '../../core/logger.service';

import {Hero} from '../shared/hero.model';

import {FormControl} from '@angular/forms';
import {HeroService} from '../shared/hero.service';

@Component({
  selector: 'toh-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
  providers: [
    LoggerService
  ]
})

export class HeroSearchComponent implements OnInit {
  heroes: Array<Hero> = [];
  searchTerms;
  showDropDown;
  searchBox;

  stateCtrl: FormControl;
  filteredStates: any;

  filterStates(val: string) {
    return val ? this.heroes.filter(s => s.name.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.heroes;
  }

  constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig,
              private heroService: HeroService,
              private router: Router) {
    this.showDropDown = false;

    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterStates(name));
  }

  ngOnInit(): void {
    this.heroService.getHeroes().then((heroes) => {
      for (const hero of heroes) {

      }
      this.heroes = heroes;
    });
  }

  gotoDetail(hero: Hero): void {
    let link = ['/' + this.appConfig.routes.heroes, hero.id];
    this.router.navigate(link);
    this.showDropDown = false;
    this.searchBox = null;
    LoggerService.log('Moved to hero with id: ' + hero.id);
  }
}
