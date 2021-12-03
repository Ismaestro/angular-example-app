import { InjectionToken } from '@angular/core';

export let ENDPOINTS_CONFIG = new InjectionToken('endpoints.config');

export const EndpointsConfig: any = {
  heroes: {
    list: 'heroes',
    detail: getHeroDetail
  }
};

export function getHeroDetail(id) {
  return `/heroes/${id}`;
}
