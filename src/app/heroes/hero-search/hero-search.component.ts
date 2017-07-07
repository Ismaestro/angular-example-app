import {Component} from '@angular/core';
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

export class HeroSearchComponent {
  heroes: Array<Hero> = [];
  heroFormControl: FormControl;
  filteredHeroes: any;

  constructor(private heroService: HeroService) {
    this.heroFormControl = new FormControl();

    this.heroService.get().subscribe((heroes) => {
      this.heroes = heroes;

      this.heroFormControl.valueChanges
        .startWith(null)
        .map(value => this.filterHeroes(value))
        .subscribe(heroesFiltered => {
          this.filteredHeroes = heroesFiltered;
        });
    });
  }

  filterHeroes(val: string) {
    return val ? this.heroes.filter(hero => hero.name.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.heroes;
  }

  searchHero(hero: Hero): void {
    LoggerService.log('Moved to hero with id: ' + hero.id);
    window.open('https://www.google.es/search?q=' + hero.name, '_blank');
  }
}
