
import {map, startWith} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {LoggerService} from '../shared/logger.service';
import {Hero} from '../../heroes/shared/hero.model';
import {FormControl} from '@angular/forms';
import {HeroService} from '../../heroes/shared/hero.service';
import {Router} from '@angular/router';
import {AppConfig} from '../../config/app.config';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  providers: [
    LoggerService
  ]
})

export class SearchBarComponent implements OnInit {

  defaultHeroes: Array<Hero>;
  heroFormControl: FormControl;
  filteredHeroes: any;

  constructor(private heroService: HeroService,
              private router: Router) {
    this.defaultHeroes = [];
    this.heroFormControl = new FormControl();
  }

  ngOnInit() {
    this.heroService.getHeroes().subscribe((heroes: Array<Hero>) => {
      this.defaultHeroes = heroes.filter(hero => hero['default']);

      this.heroFormControl.valueChanges.pipe(
        startWith(null),
        map(value => this.filterHeroes(value)))
        .subscribe(heroesFiltered => {
          this.filteredHeroes = heroesFiltered;
        });
    });
  }

  filterHeroes(val: string): Hero[] {
    return val ? this.defaultHeroes.filter(hero => hero.name.toLowerCase().indexOf(val.toLowerCase()) === 0 && hero['default'])
      : this.defaultHeroes;
  }

  searchHero(hero: Hero): Promise<boolean> {
    LoggerService.log('Moved to hero with id: ' + hero.id);
    return this.router.navigate([AppConfig.routes.heroes + '/' + hero.id]);
  }
}
