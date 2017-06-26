import {OpaqueToken} from '@angular/core';

import {IAppConfig} from './iapp.config';

export let APP_CONFIG = new OpaqueToken('app.config');

let heroesRoute = 'heroes';
export const AppConfig: IAppConfig = {
  routes: {
    heroes: heroesRoute,
    heroById: heroesRoute + '/:id'
  },
  endpoints: {
    heroes: 'https://jsonblob.com/api/jsonBlob/11ba5f87-5997-11e7-ae4c-997a6628ed33',
    heroesPowers: 'https://jsonblob.com/api/jsonBlob/f8234363-5991-11e7-ae4c-eb7c024ddb08'
  }
};
