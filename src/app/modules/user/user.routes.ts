import { Route } from '@angular/router';
import { appPaths } from '../../app-routes';
import { userPaths } from '~modules/user/shared/user-routes';
import { DashboardPageComponent } from '~modules/user/pages/dashboard/dashboard-page.component';
import { AuthGuard } from '~modules/shared/guards/auth.guard';
import { MyAccountComponent } from '~modules/user/pages/my-account/my-account.component';
import { MyHeroesPageComponent } from '~modules/user/pages/my-heroes/my-heroes-page.component';

export const USER_ROUTES: Route[] = [
  {
    path: userPaths.dashboard,
    component: DashboardPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: userPaths.myHeroes,
    component: MyHeroesPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: userPaths.myAccount,
    component: MyAccountComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: appPaths.error404 },
];
