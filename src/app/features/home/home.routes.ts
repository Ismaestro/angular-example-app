import type { Route } from '@angular/router';
import { HomeComponent } from '~features/home/home.component';
import { ROOT_PATHS } from '~core/constants/paths.constants';

export const HOME_ROUTES: Route[] = [
  {
    path: ROOT_PATHS.home,
    component: HomeComponent,
  },
];
