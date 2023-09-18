import { Route } from '@angular/router';
import { appPaths } from '../../app-routes';
import { userPaths } from '~modules/user/shared/user-routes';
import { DashboardPageComponent } from '~modules/user/pages/dashboard/dashboard-page.component';
import { MyAccountComponent } from '~modules/user/pages/my-account/my-account.component';
import { MyHeroesPageComponent } from '~modules/user/pages/my-heroes/my-heroes-page.component';
import { authenticationGuard } from '~modules/shared/guards/authentication.guard';

export const USER_ROUTES: Route[] = [
  {
    path: userPaths.dashboard,
    component: DashboardPageComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: userPaths.myHeroes,
    component: MyHeroesPageComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: userPaths.myAccount,
    component: MyAccountComponent,
    canActivate: [authenticationGuard],
  },
  { path: '**', redirectTo: appPaths.error404 },
];
