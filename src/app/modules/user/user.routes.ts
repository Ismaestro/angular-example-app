import { Route } from '@angular/router';
import { DashboardComponent } from '~modules/user/pages/dashboard/dashboard.component';
import { authenticationGuard } from '~modules/shared/guards/authentication.guard';
import { ROOT_PATHS, USER_PATHS } from '~modules/shared/consts/paths.consts';

export const USER_ROUTES: Route[] = [
  {
    path: USER_PATHS.dashboard,
    component: DashboardComponent,
    canActivate: [authenticationGuard],
  },
  { path: '**', redirectTo: ROOT_PATHS.error404 },
];
