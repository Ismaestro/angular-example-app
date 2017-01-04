import {Component, OnInit, Inject} from '@angular/core';
import {Router}            from '@angular/router';
import {Observable}        from 'rxjs/Observable';
import {Subject}           from 'rxjs/Subject';

import {APP_CONFIG, IAppConfig} from './../../app.config';
import {HeroSearchService} from './hero-search.service';
import {LoggerService} from './../../core/logger.service';

import {Hero} from './../shared/hero.model';

@Component({
    moduleId: module.id,
    selector: 'hero-search',
    templateUrl: 'hero-search.component.html',
    styleUrls: ['hero-search.component.css'],
    providers: [
        HeroSearchService,
        LoggerService
    ]
})

export class HeroSearchComponent implements OnInit {
    heroes: Observable<Hero[]>;
    private searchTerms = new Subject<string>();
    private showDropDown = false;
    private searchBox;

    constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig,
                private heroSearchService: HeroSearchService,
                private router: Router,
                private loggerService: LoggerService) {
    }

    // Push a search term into the observable stream.
    search(): void {
        this.searchTerms.next(this.searchBox);
    }

    ngOnInit(): void {
        this.heroes = this.searchTerms
            .debounceTime(200)        // wait for 200ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
                // return the http search observable
                ? this.heroSearchService.search(term)
                // or the observable of empty heroes if no search term
                : Observable.of<Hero[]>([]))
            .catch(error => {
                this.loggerService.error(error);
                return Observable.of<Hero[]>([]);
            });
    }

    gotoDetail(hero: Hero): void {
        let link = ['/' + this.appConfig.routes.heroes, hero.id];
        this.router.navigate(link);
        this.showDropDown = false;
        this.searchBox = null;
        this.loggerService.log('Moved to hero with id: ' + hero.id);
    }

    escapePressed(): void {
        this.showDropDown = false;
    }
}
