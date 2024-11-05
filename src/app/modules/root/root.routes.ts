import { Route } from '@angular/router';
import { ROOT_PATHS } from '~modules/shared/consts/paths.consts';
import { HomeComponent } from '~modules/root/pages/home/home.component';

export const ROOT_ROUTES: Route[] = [
  {
    path: ROOT_PATHS.home,
    component: HomeComponent,
  },
];
