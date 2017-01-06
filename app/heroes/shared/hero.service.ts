import { Injectable, Inject } from '@angular/core';
import { Headers, Http }      from '@angular/http';

import { APP_CONFIG, IAppConfig } from './../../app.config';
import { LoggerService }          from './../../core/logger.service';

import { Hero } from './hero.model';

@Injectable()
export class HeroService {
    private headers;
    private heroesUrl;

    constructor(private http: Http,
                private loggerService: LoggerService,
                @Inject(APP_CONFIG) private appConfig: IAppConfig) {
        this.heroesUrl = this.appConfig.endpoints.heroes;
        this.headers = new Headers({ 'Content-Type': 'application/json' });
    }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }

    getHeroesPowers(): Promise<string[]> {
        return this.http.get(this.appConfig.endpoints.heroesPowers)
            .toPromise()
            .then(response => response.json().data as string[])
            .catch(this.handleError);
    }

    getHeroById(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
    }

    create(hero: Hero): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({
                name: hero.name,
                alterEgo: hero.alterEgo,
                power: hero.power
            }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    remove(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        this.loggerService.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
