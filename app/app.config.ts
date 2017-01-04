import {OpaqueToken} from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");

export interface IAppConfig {
    routes: any;
    endpoints: any;
    title: string
}

let heroesRoute = 'heroes';
export const AppConfig: IAppConfig = {
    title: 'Tour of Heroes',
    routes: {
        heroes: heroesRoute,
        heroById: heroesRoute + '/:id'
    },
    endpoints: {
        heroes: 'api/heroes'
    }
};