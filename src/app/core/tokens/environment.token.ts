import { InjectionToken } from '@angular/core';

export type Environment = {
  apiBaseUrl: string;
  domain: boolean;
};

export const ENVIRONMENT = new InjectionToken<Environment>('Environment Configuration');
