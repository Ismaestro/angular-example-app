import { map, startWith } from 'rxjs/operators';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../../hero/shared/hero.model';
import { ROUTES_CONFIG } from '../../../../configs/routes.config';
import { HeroService } from '../../../hero/shared/hero.service';

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
    this.heroService.searchHeroes({ fetchPolicy: 'no-cache' }).subscribe((heroes: Array<Hero>) => {
      this.defaultHeroes = heroes;

      this.heroFormControl.valueChanges.pipe(
        startWith(null as unknown as string),
        map(value => this.filterHeroes(value)))
        .subscribe(heroesFiltered => {
          this.filteredHeroes = heroesFiltered;
        });
    });
  }

  filterHeroes(val: string): Hero[] {
    return val ? this.defaultHeroes.filter(hero => hero.alterEgo.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.defaultHeroes;
  }
}
