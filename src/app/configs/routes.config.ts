import { InjectionToken } from '@angular/core';

export let ROUTES_CONFIG = new InjectionToken('routes.config');

const basePaths = {
  hero: 'hero'
};

const routesNames = {
  home: '',
  error404: '404',
  hero: {
    myHeroes: 'my-heroes',
    detail: ':id',
  }
};

export const RoutesConfig: any = {
  basePaths,
  routesNames,
  routes: {
    home: `/${routesNames.home}`,
    error404: `/${routesNames.error404}`,
    hero: {
      myHeroes: `/${routesNames.hero.myHeroes}`,
      detail: getHeroDetail
    }
  }
};

export function getHeroDetail(id) {
  return `/${basePaths.hero}/${id}`;
}
