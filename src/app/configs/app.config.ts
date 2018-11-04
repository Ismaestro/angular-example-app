import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  routes: {
    heroes: 'heroes',
    error404: '404'
  },
  votesLimit: 3,
  topHeroesLimit: 4,
  snackBarDuration: 3000,
  repositoryURL: 'https://github.com/ismaestro/angular7-example-app',
  sentryDSN: 'https://38434a1b115f41d3a31e356cdc496c06@sentry.io/1315526'
};
