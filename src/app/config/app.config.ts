import {OpaqueToken} from '@angular/core';

import {IAppConfig} from './iapp.config';

export let APP_CONFIG = new OpaqueToken('app.config');

let heroesRoute = 'heroes';
export const AppConfig: IAppConfig = {
  title: 'Tour of Heroes',
  routes: {
    heroes: heroesRoute,
    heroById: heroesRoute + '/:id'
  },
  endpoints: {
    heroes: 'api/heroes',
    heroesPowers: 'api/heroesPowers'
  }
};
