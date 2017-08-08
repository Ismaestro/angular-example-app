import {Component, Inject} from '@angular/core';
import {LoggerService} from '../../core/logger.service';
import {Hero} from '../shared/hero.model';
import {FormControl} from '@angular/forms';
import {HeroService} from '../shared/hero.service';
import {Router} from '@angular/router';
import {IAppConfig} from '../../config/iapp.config';
import {APP_CONFIG} from '../../config/app.config';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
  providers: [
    LoggerService
  ]
})

export class HeroSearchComponent {
  defaultHeroes: Array<Hero> = [];
  heroFormControl: FormControl;
  filteredHeroes: any;
  heroesAutocomplete: any;

  constructor(private heroService: HeroService,
              @Inject(APP_CONFIG) private appConfig: IAppConfig,
              private router: Router) {
    this.heroFormControl = new FormControl();

    this.heroService.getAllHeroes().subscribe((heroes) => {
      this.defaultHeroes = heroes.filter(hero => hero['default']);

      this.heroFormControl.valueChanges
        .startWith(null)
        .map(value => this.filterHeroes(value))
        .subscribe(heroesFiltered => {
          this.filteredHeroes = heroesFiltered;
        });
    });
  }

  filterHeroes(val: string) {
    return val ? this.defaultHeroes.filter(hero => hero.name.toLowerCase().indexOf(val.toLowerCase()) === 0 && hero['default'])
      : this.defaultHeroes;
  }

  searchHero(hero: Hero): void {
    LoggerService.log('Moved to hero with id: ' + hero.id);
    this.router.navigate([this.appConfig.routes.heroById + hero.id])
  }
}
