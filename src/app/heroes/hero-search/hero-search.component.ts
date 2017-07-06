import {Component, Inject} from "@angular/core";
import {Router} from "@angular/router";
import {APP_CONFIG} from "../../config/app.config";
import {IAppConfig} from "../../config/iapp.config";
import {LoggerService} from "../../core/logger.service";
import {Hero} from "../shared/hero.model";
import {FormControl} from "@angular/forms";
import {HeroService} from "../shared/hero.service";

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

  constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig,
              private heroService: HeroService,
              private router: Router) {
    this.heroFormControl = new FormControl();

    this.heroService.getHeroes().then((heroes) => {
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

  gotoDetail(hero: Hero): void {
    this.router.navigate(['/' + this.appConfig.routes.heroes, hero.id]);
    LoggerService.log('Moved to hero with id: ' + hero.id);
  }
}
