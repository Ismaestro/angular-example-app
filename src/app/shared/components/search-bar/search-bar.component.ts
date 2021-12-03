import { map, startWith } from 'rxjs/operators';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../../modules/heroes/shared/hero.model';
import { ROUTES_CONFIG } from '../../../configs/routes.config';
import { HeroService } from '../../../modules/core/services/hero.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {

  defaultHeroes: Array<Hero>;
  heroFormControl: FormControl;
  filteredHeroes: any;

  constructor(private heroService: HeroService,
              @Inject(ROUTES_CONFIG) public routesConfig: any) {
    this.defaultHeroes = [];
    this.heroFormControl = new FormControl();
  }

  ngOnInit() {
    this.heroService.getHeroes().subscribe((heroes: Array<Hero>) => {
      this.defaultHeroes = heroes.filter(hero => hero.default);

      this.heroFormControl.valueChanges.pipe(
        startWith(null as string),
        map(value => this.filterHeroes(value)))
        .subscribe(heroesFiltered => {
          this.filteredHeroes = heroesFiltered;
        });
    });
  }

  filterHeroes(val: string): Hero[] {
    return val ? this.defaultHeroes.filter(hero => hero.name.toLowerCase().indexOf(val.toLowerCase()) === 0 && hero.default)
      : this.defaultHeroes;
  }
}
