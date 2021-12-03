import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  votesLimit: 3,
  topHeroesLimit: 5,
  snackBarDuration: 3000,
  repositoryURL: 'https://github.com/ismaestro/angular8-example-app',
  sentryDSN: 'https://38434a1b115f41d3a31e356cdc496c06@sentry.io/1315526',
  cspDirectives: {
    defaultSrc: [
      '\'self\'',
      'data:',
      'http://*.google-analytics.com',
      'http://www.googletagmanager.com',
      'https://*.google.com',
      'https://*.google-analytics.com',
      'https://*.googletagmanager.com',
      'https://*.gstatic.com',
      'https://*.googleapis.com',
      'https://authedmine.com',
      'https://az743702.vo.msecnd.net',
      'https://sentry.io',
      'ws://localhost:4200'
    ],
    frameAncestors: ['\'self\''],
    upgradeInsecureRequests: true,
    styleSrc: [
      '\'self\'',
      '\'unsafe-inline\'',
      'https://*.googleapis.com'
    ],
    scriptSrc: [
      '\'self\'',
      '\'unsafe-inline\'',
      'http://*.googletagmanager.com',
      'https://*.google-analytics.com'
    ]
  }
};
