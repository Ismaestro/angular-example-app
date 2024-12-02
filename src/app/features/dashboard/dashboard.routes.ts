import type { Route } from '@angular/router';
import { DashboardComponent } from '~features/dashboard/dashboard.component';
import { authenticationGuard } from '~core/guards/authentication.guard';
import { DASHBOARD_PATHS, ROOT_PATHS } from '~core/constants/paths.constants';

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: DASHBOARD_PATHS.base,
    component: DashboardComponent,
    canActivate: [authenticationGuard],
  },
  { path: '**', redirectTo: ROOT_PATHS.error404 },
];
