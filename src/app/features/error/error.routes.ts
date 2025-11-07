import type { Route } from '@angular/router';
import { Error404Component } from '~features/error/pages/error-404/error-404.component';
import { ERROR_PATHS } from '~core/constants/paths.constants';

export const ERROR_ROUTES: Route[] = [{ path: ERROR_PATHS.notFound, component: Error404Component }];
