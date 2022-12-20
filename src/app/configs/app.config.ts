import { InjectionToken } from '@angular/core';
import { IAppConfig } from './app-config.interface';

export const APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: IAppConfig = {
  bypassAuthorization: 'bypassAuthorization',
  alertMilliseconds: 3000,
  defaultLang: 'en',
  customQueryParams: {
    origin: 'origin',
    alertId: 'alertId',
  },
  languages: {
    es: 'es',
    en: 'en',
  },
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  },
  endpoints: {
    graphql: 'graphql',
  },
};
