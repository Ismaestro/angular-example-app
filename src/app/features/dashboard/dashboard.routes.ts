import { Route } from '@angular/router';
import { DashboardComponent } from '~features/dashboard/dashboard.component';
import { authenticationGuard } from '~core/guards/authentication.guard';
import { ROOT_PATHS, DASHBOARD_PATHS } from '~core/consts/paths.consts';

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: DASHBOARD_PATHS.base,
    component: DashboardComponent,
    canActivate: [authenticationGuard],
  },
  { path: '**', redirectTo: ROOT_PATHS.error404 },
];
