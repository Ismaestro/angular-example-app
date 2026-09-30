import { InjectionToken } from '@angular/core';

export type Environment = {
  apiBaseUrl: string;
  domain: string;
};

export const ENVIRONMENT = new InjectionToken<Environment>('Environment Configuration');
